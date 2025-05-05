import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./styles.css";
import * as storyAPI from "../../utilities/story-api";

export default function StoryFormPage({ createStory, editStory, deleteStory, user }) {
    const initialState = { title: "", description: "", content: "" };
    const [currStory, setCurrStory] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const { id, categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const story = await storyAPI.show(id);
                setCurrStory(story);
                setFormData(story);
            } catch (err) {
                console.log(err);
                setCurrStory(null);
                setFormData(initialState);
            }
        }
        if ((editStory || deleteStory) && id) getAndSetDetail();
    }, [id, editStory, deleteStory]);

    function handleChange(evt) {
        const updatedData = { ...formData, [evt.target.name]: evt.target.value };
        setFormData(updatedData);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        if (!user || !user.id) {
            console.log("Error: User is not logged in or does not have an ID.");
            return;
        }

        try {
            const newStoryData = { ...formData, category: categoryId };
            const newStory = editStory
                ? await storyAPI.update(newStoryData, currStory.id, user.token)
                : await storyAPI.create(newStoryData, categoryId, user.token);

            if (newStory && newStory.id) {
                setFormData(initialState);
                navigate(`/story/${newStory.id}`);
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
                navigate("/story");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //  delete view
    if (deleteStory) {
        if (!currStory) return <h1>Loading...</h1>;
        return (
            <>
                <div className="page-header"><h1>Delete Story?</h1></div>
                <h2>Are you sure you want to delete "{currStory.title}"?</h2>
                <form onSubmit={handleDelete}>
                    <Link to={`/story/${currStory.id}`} className="btn secondary">Cancel</Link>
                    <button type="submit" className="btn danger">Yes - Delete!</button>
                </form>
            </>
        );
    }

    // create or edit view
    if (createStory || editStory) {
        if (editStory && !currStory) return <h1>Loading...</h1>;
        return (
            <>
                <div className="page-header">{editStory ? <h1>Edit "{currStory?.title}"</h1> : <h1 className="add">Add a Story</h1>}</div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <table><tbody>
                        {!editStory && <tr><th><label htmlFor="id_title"></label></th><td><input className="in" placeholder="Title:" value={formData.title} type="text" name="title" maxLength="100" required id="id_title" onChange={handleChange} /></td></tr>}
                        <tr><th><label htmlFor="id_description"></label></th><td><textarea placeholder="Description:" className="text" value={formData.description} name="description" maxLength="250" required id="id_description" onChange={handleChange}></textarea></td></tr>
                        <tr><th><label htmlFor="id_content"></label></th><td><textarea placeholder="Content:" className="text" value={formData.content} name="content" maxLength="250" required id="id_content" onChange={handleChange}></textarea></td></tr>
                    </tbody></table>
                    <button type="submit" className="btn-end-submit">Submit!</button>
                </form>
            </>
        );
    }

    //  Read only view
    if (!currStory) return <h1>Loading...</h1>;

    return (
        <div className="story-view-container">
            <div className="page-header"><h1>{currStory.title}</h1></div>
            <h3>{currStory.description}</h3>
            <p>{currStory.content}</p>
            {user && user.id === currStory.authorId && (
                <div className="action-links">
                    <Link to={`/story/${currStory.id}/edit`} className="btn">Edit</Link>
                    <Link to={`/story/${currStory.id}/delete`} className="btn danger">Delete</Link>
                </div>
            )}
        </div>
    );
}
