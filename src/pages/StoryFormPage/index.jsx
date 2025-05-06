import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./styles.css";
import * as storyAPI from "../../utilities/story-api";

export default function StoryFormPage({ createStory, editStory, deleteStory, user }) {
    const initialState = { title: "", description: "", content: "", photoUrl: "" };
    const [currStory, setCurrStory] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const [photoUrl, setPhotoUrl] = useState("");
    const { id, categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const story = await storyAPI.show(id);
                setCurrStory(story);
                setFormData(story);
                setPhotoUrl(story.photoUrl || "");
            } catch (err) {
                console.log(err);
                setCurrStory(null);
                setFormData(initialState);
                setPhotoUrl("");
            }
        }

        if ((editStory || deleteStory) && id) {
            getAndSetDetail();
        } else {
            setFormData(initialState);
            setPhotoUrl("");
        }

        return () => {
            setFormData(initialState);
            setPhotoUrl("");
        };
    }, [id, editStory, deleteStory]);

    function handleChange(evt) {
        const updatedData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedData);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        if (!user || !user.id) {
            console.log(user)
            console.log("Error: User is not logged in or does not have an ID.");
            return;
        }

        setFormData(initialState);

        try {
            let catId
            categoryId ? catId = categoryId : catId = currStory.category 
            const newStoryData = { ...formData, category: catId};
            // const newStoryData = { ...formData, category: categoryId };
            const newStory = editStory
                ? await storyAPI.update(newStoryData, currStory.id, user.token)
                : await storyAPI.create(newStoryData, categoryId, user.token);
            console.log('response', newStory)
            console.log('formData',newStoryData)
            
            setFormData(initialState);
            setPhotoUrl("");
            if (newStory.id) {
                navigate(`/story/${newStory.id}`);
            } else if (newStory[newStory.length-1].id) {
                navigate(`/story/${newStory[newStory.length-1].id}`);
            } else {
                console.log("Story creation/edit failed: no ID in response.");
            }
        } catch (err) {
            console.log("Error in handleSubmit:", err);
        }
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        try {
            const response = await storyAPI.deleteStory(currStory.id);
            if (response.success) {
                setFormData(initialState);
                setPhotoUrl("");
                navigate("/category");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // DELETE view
    if (deleteStory) {
        if (!currStory) return <h1>Loading...</h1>;
        return (
            <>
                <div className="page-header"><h1>Delete Story?</h1></div>
                <h2>Are you sure you want to delete "{currStory.title}"?</h2>
                <form onSubmit={handleDelete}>
                    <Link to={`/story/${currStory.id}`} className="btn-secondary">Cancel</Link>
                    <button type="submit" className="submit-yes">Yes - Delete!</button>
                </form>
            </>
        );
    }

    // CREATE or EDIT view
    if (createStory || editStory) {
        if (editStory && !currStory) return <h1>Loading...</h1>;
        return (
            <>
                <div className="page-header">{editStory ? <h1>Edit "{currStory?.title}"</h1> : <h1 className="add">Add a Story</h1>}</div>
                <form className="form-container" onSubmit={handleSubmit}>
                    {!editStory && (
                        <div><label htmlFor="id_title"></label><input className="in" placeholder="Title:" value={formData.title} type="text" name="title" required id="id_title" onChange={handleChange} /></div>
                    )}
                    <input type="text" value={formData.photoUrl} onChange={handleChange} placeholder="Enter image URL" name="photo_url"/>
                    
                    <div><label htmlFor="id_description"></label><textarea placeholder="Description:" className="text" value={formData.description} name="description" maxLength="250" required id="id_description" onChange={handleChange}></textarea></div>
                    <div><label htmlFor="id_content"></label><textarea placeholder="Content:" className="text" value={formData.content} name="content"  required id="id_content" onChange={handleChange}></textarea></div>
                    <button type="submit" className="btn-end-submit">Submit!</button>
                </form>
            </>
        );
    }

    // READ-ONLY view
    if (!currStory) return <h1>Loading...</h1>;

    return (
        <div className="story-view-container">
            <div className="page-header"><h1>{currStory.title}</h1></div>
            <h3>{currStory.description}</h3>
            <p>{currStory.content}</p>
            {user && user.id === currStory.authorId && (
                <div className="action-links">
                    <Link to={`/story/${currStory.id}/edit`} className="btn-edit">Edit</Link>
                    <Link to={`/story/${currStory.id}/delete`} className="btn-delete">Delete</Link>
                </div>
            )}
        </div>
    );
}
