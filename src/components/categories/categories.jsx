import "./styles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

      
export default function Categories({ category }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/story/new/${category.id}`);



      };

    return (
        <div className="category-index-card">
                <div className="category-index-card-content">
                    <h2>{category.category_type}</h2> <button className="btn" onClick={handleClick}>+</button>
                </div>
        </div>
 
    )
}