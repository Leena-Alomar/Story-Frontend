import "./styles.css";
import { useState, useEffect } from "react";
import Categories from '../../components/categories/categories';
import { Routes, Route, useNavigate } from "react-router-dom";
// import fall from "../../assets/images/fall.png";


import * as categoryAPI from "../../utilities/category-api";
import * as storyAPI from "../../utilities/story-api";




export default function CategoryIndexPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [allStory, setAllStory] = useState([]);
  const [user, setUser] = useState(null);



  useEffect(() => {
    async function getAllStory() {
      try {
        const storyData = await storyAPI.index();
        setAllStory(storyData);
      } catch (err) {
        console.log(err);
      }
    }
    getAllStory();
  }, []);

  useEffect(() => {
    async function getAllCategories() {
      try {
        const categoriesData = await categoryAPI.index();
        setAllCategories(categoriesData);
      } catch (err) {
        console.log(err);
      }
    }
    getAllCategories();
  }, []);

  const groupedStories = allCategories.map(category => {
    const storiesInCategory = allStory.filter(story => story.category === category.id);
    return { ...category, stories: storiesInCategory };
  });

  function getStoryByCategory(storyId) {
    return allStory.find(story => story._id === storyId);
  }

  return (
    <section className="index-card-container">
      {/* <img src={fall} alt="Story" className="fall-image" /> */}
      {groupedStories.map(cat => (
        <Categories key={cat.id} category={cat} />
      ))}


    </section>
  );
}
