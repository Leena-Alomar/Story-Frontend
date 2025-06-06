import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as reviewAPI from "../../utilities/review-api";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan} from '@fortawesome/free-solid-svg-icons';
import land from "../../assets/images/land.png";

const ReviewPAgeIndex = () => {
    const { id: storyId } = useParams();
    const [getAllReviews, setAllReviews] = useState([]);
    const [formData, setFormData] = useState({ reviewContent: "" });
    const [user, setUser] = useState({ id: "user-id" }); 


    async function fetchReviews() {
        try {
            const reviews = await reviewAPI.getReviewsByStory(storyId);
            setAllReviews([...reviews]);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    }
    useEffect(() => {
        fetchReviews();
    }, [storyId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const newReviewData = { content: formData.reviewContent, story_id: storyId };
            const newReview = await reviewAPI.create(newReviewData, storyId);
            console.log(newReview)
            try{
                await fetchReviews();
                setFormData({ reviewContent: "" }); 
            } catch(err){
                console.log(err)
            }
        } catch (err) {
            console.error("Error in handleSubmit:", err);
        }
    };

        async function handleDelete(evt,reviewId) {
            evt.preventDefault();
            try {
                const response = await reviewAPI.deleteReview(reviewId);
                if (response.success) {
                    fetchReviews()
                }
            } catch (err) {
                console.log(err);
            }
        }

    return (
        <div> 
            <img src={land} alt="Story" className="review-image" />
            <section className="review">
            <div className="scroll">
                <textarea  className="text-re" name="reviewContent" placeholder="Enter your review here..." value={formData.reviewContent} onChange={handleChange}></textarea>
                <button className="sbtn1" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
              
            </div> 
           
            <div className="reviews">
                <h2 className='title-review'>Comments</h2>
                {getAllReviews.length > 0 ? (
                <ul>
                {getAllReviews.map((review) => (
                    <li key={review.id} className="review-item">
                         <p className="comment">{review.user_review.username}</p>
                        <p className='con'>{review.content}</p> <button  className="sbtn2" onClick={(e) =>{handleDelete(e, review.id)}}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </li> ))}
                </ul>
                ) : (
                    <p className='no-comm'>No comments yet.</p>
                )}
            </div>
            </section>
        </div>
    );
};

export default ReviewPAgeIndex;