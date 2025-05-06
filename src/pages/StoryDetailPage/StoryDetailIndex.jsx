import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import * as storyAPI from "../../utilities/story-api";
// import * as likeAPI from "../../utilities/like-api"; 

export default function StoryDetailPage({ user }) {
  const [StoryDetail, setStoryDetail] = useState(null);
  const { id } = useParams();
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  // const [likes, setLikes] = useState([]); 

  // const fetchLikes = async () => {
  //   try {
  //     const data = await likeAPI.getLikesByStory(id);
  //     setLikes(data);
  //   } catch (err) {
  //     console.error("Error fetching likes:", err);
  //   }
  // };

  const handleConvert = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/text-to-speech/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Error converting text to speech');

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     const newLikeData = { story_liked: id };
  //     await likeAPI.createLike(newLikeData);
  //     fetchLikes(); 
  //   } catch (err) {
  //     console.error("Error submitting like:", err);
  //   }
  // };

  // const userAlreadyLiked = likes.some(like => like.user_fav?.id === user?.id);

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const storyData = await storyAPI.show(id);
        setStoryDetail(storyData);
        // fetchLikes();
      } catch (err) {
        console.log(err);
        setStoryDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  async function handleRemoveStory(evt) {
    evt.preventDefault();
    try {
      const storyData = await storyAPI.removeStoryFromCategory(StoryDetail.id);
      console.log(storyData);
    } catch (err) {
      console.log(err);
    }
  }

  if (!StoryDetail) return <h3>Your story details will display soon</h3>;

  return (
    <section className="detail-container">
      <div className="story-details">
        <img src={StoryDetail.photo_url} alt="Story" className="story-image" />
        <h1 className="title">{StoryDetail.title}</h1>
        <p className="content">{StoryDetail.content}</p>
        {/* <button className="sbtn"  onClick={handleLike} disabled={userAlreadyLiked} >❤️ {userAlreadyLiked ? "Liked" : "Like"} ({likes.length})</button> */}

        <div className="story-actions">
          <Link to={`/story/${StoryDetail.id}/review/new`} className="btn-warn">Review</Link>
          <Link to={`/story/edit/${StoryDetail.id}`} className="btn-warn">Edit</Link>
          <Link to={`/story/confirm_delete/${StoryDetail.id}`} className="btn-danger">Delete</Link>
        </div>
      </div>


      <div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert"
        />
        <br />
        <button onClick={handleConvert}>Convert to Speech</button>
        {audioUrl && (
          <audio controls autoPlay>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </section>
  );
}
