import "./styles.css";
import { useState, useEffect } from "react";

import Categories from '../../components/categories/categories'

import * as categoryAPI from "../../utilities/category-api"

export default function CategoryIndexPage() {
  const [allCategories, setAllCategories] = useState([]);
  


  useEffect(() => {
    async function getAllCategories() {
        try {
            const categoriesData = await categoryAPI.index()
            console.log("Fetched categories:", categoriesData); 
            setAllCategories(categoriesData)
        } catch (err) {
            console.log(err);
        }
    }
    if (allCategories.length === 0) getAllCategories()
}, [])

  const displayAllCategories = allCategories.map(c => (
    <Categories key={c.id} category={c}/>
  ))


  
  return (<>
    <section className="index-card-container">
      {displayAllCategories}
    </section>
  </>)
}