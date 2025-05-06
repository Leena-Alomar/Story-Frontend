import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Categories({ category }) {
  const navigate = useNavigate();
  console.log(category)

  const handleClick = () => {
    navigate(`/story/new/${category.id}`);
  };

  return (
    <div className="category-index-card">
      <div className="author-top">
      {/* <p className="des">{story.author.username}</p> */}
      </div>
      <div className="category-index-card-content">
        <h2 className="type">{category.category_type}</h2>
        <button className="btn" onClick={handleClick}>+</button>
      </div>

      <div className="stories-scroll-container">
        {category.stories.map(story => (
          <div className="story-cards">  
           <img src={story.photo_url} alt="Story" className="story-image" />
            <Link to={`/story/${story.id}`} className="story-link">
            <h4 className="title">{story.title}</h4>
            </Link>
            <p className="des">{story.author.username}</p>
            <h4 className="des">{story.description}</h4>
          </div>
        
        ))}
      </div>
    </div>
  );
}
