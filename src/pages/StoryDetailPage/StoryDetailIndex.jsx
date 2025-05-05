// IMPORTS
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

// APIs
import * as storyAPI from "../../utilities/story-api";

export default function StoryDetailPage() {
  const [StoryDetail, setStoryDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const storyData = await storyAPI.show(id);
        console.log(storyData);
        setStoryDetail(storyData);
      } catch (err) {
        console.log(err);
        setStoryDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  async function handleRemoveStory(evt) {
    try {
      evt.preventDefault();
      const storyData = await storyAPI.removeStoryFromCategory(StoryDetail.id);
      console.log(storyData); 
    } catch (err) {
      console.log(err);
    }
  }

  if (!StoryDetail) return <h3>Your story details will display soon</h3>;

  return (
    <>
      <section className="detail-container">
        <div className="story-details">
          <h1 className="title">{StoryDetail.title}</h1>
          <p className="content">{StoryDetail.content}</p>
          <div className="story-actions">
            <Link to={`/story/${StoryDetail.id}/review/new`} className="btn-warn">Review</Link>
            <Link to={`/story/edit/${StoryDetail.id}`} className="btn-warn">Edit</Link>
            <Link to={`/story/confirm_delete/${StoryDetail.id}`} className="btn-danger">Delete</Link>
          </div>
        </div>
      </section>
    </>
  );
}
