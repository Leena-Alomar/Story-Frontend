import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Categories({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story/new/${category.id}`);
  };

  return (
    <div className="category-index-card">
      <div className="category-index-card-content">
        <h2 className="type">{category.category_type}</h2>
        <button className="btn" onClick={handleClick}>+</button>
      </div>

      <div className="stories-scroll-container">
        {category.stories.map(story => (
          <div className="story-cards">  
            <Link to={`/story/${story._id}`} className="story-link">
            <h4 className="title">{story.title}</h4>
            </Link>
            <h4 className="des">{story.description}</h4>
          </div>
        
        ))}
      </div>
    </div>
  );
}
