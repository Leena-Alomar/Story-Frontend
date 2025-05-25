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
      <div className="category-index-card-content">
        <h2 className="type">{category.category_type}</h2>
        <button className="btn" onClick={handleClick}>+</button>
      </div>

      <div className="stories-scroll-container">
        {category.stories.map(story => (
          <div className="story-cards" key={story.id}>  
               <Link to={`/story/${story.id}`} className="story-link"><img src={story.photo_url} alt="Story" className="story-image" /></Link>
            <h4 className="title-story">{story.title}</h4>
            <p className="des">{story.author.username}</p>
          </div>
        
        ))}
      </div>
    </div>
  );
}
