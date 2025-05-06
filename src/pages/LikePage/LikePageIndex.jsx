import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as likeAPI from "../../utilities/like-api";
import "./styles.css";

const LikePageIndex = () => {
    const { id: storyId } = useParams();
    const [likes, setLikes] = useState([]);
    const [user] = useState({ id: user.id, username: user.name });

    useEffect(() => {
        fetchLikes();
    }, [storyId]);

    async function fetchLikes() {
        try {
            const data = await likeAPI.getLikesByStory(storyId);
            setLikes(data);
        } catch (err) {
            console.error("Error fetching likes:", err);
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newLikeData = { story_liked: storyId };
            await likeAPI.createLike(newLikeData);
            await fetchLikes();
        } catch (err) {
            console.error("Error submitting like:", err);
        }
    };

    async function handleDelete(evt, likeId) {
        evt.preventDefault();
        try {
            await likeAPI.deleteLike(likeId);
            await fetchLikes();
        } catch (err) {
            console.error("Error deleting like:", err);
        }
    }


    const userAlreadyLiked = likes.some(like => like.user_fav?.id === user.id);

    return (
        <div>
            <section className="like">
                <button 
                    className="sbtn" 
                    onClick={handleSubmit}
                    disabled={userAlreadyLiked}
                >
                    ❤️ {userAlreadyLiked ? "Liked" : "Like"} ({likes.length})
                </button>

                <div className="likes">
                    <h2 className='title-like'>Likes</h2>
                    {likes.length > 0 ? (
                        <ul>
                            {likes.map((like) => (
                                <li key={like.id} className="like-item">
                                    <p className='con'>{like.user_fav?.username || 'Someone'} liked this</p>
                                    <button className="sbtn" onClick={(e) => handleDelete(e, like.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No likes yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LikePageIndex;
