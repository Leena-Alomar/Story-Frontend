import "./styles.css";
import { useState, useEffect } from "react";

import Categories from '../../components/categories/categories'

import * as categoryAPI from "../../utilities/category-api"
import * as storyAPI from "../../utilities/story-api";

export default function CategoryIndexPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [allStory, setAllStory] = useState([]);

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

  // Group stories by category
  const groupedStories = allCategories.map(category => {
    const storiesInCategory = allStory.filter(story => story.category === category.id);
    return { ...category, stories: storiesInCategory };
  });

  return (
    <section className="index-card-container">
      {groupedStories.map(cat => (
        <Categories key={cat.id} category={cat} />
      ))}
    </section>
  );
}
