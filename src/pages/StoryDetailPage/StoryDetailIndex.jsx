// IMPORTS
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";


// COMPONENTS


// APIs
import * as storyAPI from "../../utilities/story-api";

export default function StoryDetailPage() {
  const [StoryDetail, setStoryDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const storyData = await storyAPI.show(id);
        setStoryDetail(storyData);
      } catch (err) {
        console.log(err);
        setStoryDetail(null);
      }
    }
    if (id) getAndSetDetail()
  }, [id])



  async function handleRemoveStory(evt, storyId) {
    try {
      evt.preventDefault()
      const storyData = await storyAPI.removeStoryFromCategory(StoryDetail.id, storyId);
    } catch (err) {
      console.log(err);
    }
  }



  if (!StoryDetail) return <h3>Your story details will display soon</h3>

  return (<>
    <section className="detail-container">
      <div className="story-details">
        <h1>{StoryDetail.title}</h1>
        <p>{StoryDetail.description}</p>
        <div className="story-actions">
          <Link to={`/story/edit/${StoryDetail.id}`} className="btn warn">Edit</Link>
          <Link to={`/story/confirm_delete/${StoryDetail.id}`} className="btn danger">Delete</Link>
        </div>
      </div>
    </section>
  </>)
}




// // IMPORTS
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { useParams, Link } from "react-router";


// // APIs
// import * as storyAPI from "../../utilities/story-api";

// export default function StoryFormPage({ createStory, editStory, deleteStory, user }) {
//     const initialState = { title: "", description: "", content: "" };
//     const [currStory, setCurrStory] = useState(null);
//     const [formData, setFormData] = useState(initialState);
//     const { id, categoryId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         async function getAndSetDetail() {
//             try {
//                 const story = await storyAPI.show(id);
//                 setCurrStory(story);
//                 setFormData(story);
//             } catch (err) {
//                 console.log(err);
//                 setCurrStory(null);
//                 setFormData(initialState);
//             }
//         }

//         if ((editStory || deleteStory || (!createStory && id)) && id) {
//             getAndSetDetail();
//         }
//     }, [id]);

//     function handleChange(evt) {
//         const updatedData = { ...formData, [evt.target.name]: evt.target.value };
//         setFormData(updatedData);
//     }

//     async function handleSubmit(evt) {
//         try {
//             evt.preventDefault();

//             if (!user || !user.id) {
//                 console.log("Error: User is not logged in or does not have an ID.");
//                 return;
//             }

//             const newStoryData = {
//                 ...formData,
//                 category: categoryId,
//             };

//             const newStory = editStory
//                 ? await storyAPI.update(newStoryData, currStory.id, user.token)
//                 : await storyAPI.create(newStoryData, categoryId, user.token);

//             if (newStory && newStory.id) {
//                 setFormData(initialState);
//                 navigate(`/story/${newStory.id}`);
//             } else {
//                 console.log("Story creation failed: missing response or ID");
//             }
//         } catch (err) {
//             console.log("Error in handleSubmit:", err);
//         }
//     }

//     async function handleDelete(evt) {
//         try {
//             evt.preventDefault();
//             const response = await storyAPI.deleteStory(currStory.id);
//             if (response.success) {
//                 setFormData(initialState);
//                 navigate("/story");
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }


//     if (deleteStory && !currStory) return <h1>Loading</h1>;
//     if (deleteStory && currStory) return (
//         <>
//             <div className="page-header">
//                 <h1>Delete Story?</h1>
//             </div>
//             <h2>Are you sure you want to delete {currStory.title}?</h2>
//             <form onSubmit={handleDelete}>
//                 <Link to={`/story/${currStory.id}`} className="btn secondary">Cancel</Link>
//                 <button type="submit" className="btn danger">Yes - Delete!</button>
//             </form>
//         </>
//     );

 
//     if (editStory && !currStory) return <h1>Loading</h1>;
//     if (createStory || editStory) return (
//         <>
//             <div className="page-header">
//                 {editStory ? <h1>Edit {currStory.title}'s Info</h1> : <h1 className="add">Add a Story</h1>}
//             </div>
//             <form className="form-container" onSubmit={handleSubmit}>
//                 <table>
//                     <tbody>
//                         {!editStory &&
//                             <tr>
//                                 <th><label htmlFor="id_title"></label></th>
//                                 <td><input className="in" placeholder="Title:" value={formData.title} type="text" name="title" maxLength="100" required id="id_title" onChange={handleChange} /></td>
//                             </tr>
//                         }
//                         <tr>
//                             <th><label htmlFor="id_description"></label></th>
//                             <td>
//                                 <textarea placeholder="Description:" className="text" value={formData.description} name="description" cols="40" rows="10" maxLength="250" required id="id_description" onChange={handleChange}></textarea>
//                             </td>
//                         </tr>
//                         <tr>
//                             <th><label htmlFor="id_content"></label></th>
//                             <td><textarea placeholder="Content:" className="text" value={formData.content} name="content" cols="40" rows="10" maxLength="250" required id="id_content" onChange={handleChange} /></td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <button type="submit" className="btn-end-submit">Submit!</button>
//             </form>
//         </>
//     );


//     if (!createStory && !editStory && !deleteStory) {
//         if (!currStory) return <h1>Loading...</h1>;

//         return (
//             <div className="story-view-container">
//                 <div className="page-header">
//                     <h1>{currStory.title}</h1>
//                 </div>
//                 <h3>{currStory.description}</h3>
//                 <p>{currStory.content}</p>
//                 {user && user.id === currStory.authorId && (
//                     <div className="action-links">
//                         <Link to={`/story/${currStory.id}/edit`} className="btn">Edit</Link>
//                         <Link to={`/story/${currStory.id}/delete`} className="btn danger">Delete</Link>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     return null;
// }
