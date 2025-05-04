
// IMPORTS
import "./App.css";
import {  useEffect, useState } from "react";
import { Route, Routes, Link, useLocation, Navigate } from 'react-router';


// COMPONENTS
import HomePage from "../HomePage";
import CategoryIndexPage from "../CategoryIndexPage/CategoryIndexPage";
import Navbar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/signup";
import StoryFormPage from "../StoryFormPage";
import WelcomePage from "../WelcomePage/welcome";

import { getUser } from '../../utilities/users-api';

function App () {
    const [user, setUser] = useState(getUser());
 

    
    useEffect(() => {
      async function fetchUser() {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      }
      fetchUser();
    }, []);

  return (
    <>
   
    <header>
      <div className={`header-logo-container`}>
        <Link to="/">
          {/* <img src={headerLogo} alt="The Cat Collector Logo" /> */}
        </Link>
      </div>
      </header>

      <Routes>
      <Route path="/" element={<WelcomePage />} />
      {user ? 
        <>
          <Route path="/home" element={<HomePage setUser={setUser} />} />
          <Route path="/Category" element={<CategoryIndexPage />} />
          <Route path="/story" element={<StoryFormPage />} />
          <Route path="/story/new/:categoryId" element={<StoryFormPage createStory={true} user={user} />} />
          <Route path="/story/edit/:id" element={<StoryFormPage editStory={true} />} />
          <Route path="/story/confirm_delete/:id" element={<StoryFormPage delete={true} />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
        </>
        : 
        <>
          <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
          <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      }
    </Routes>

                
    </>
  )
}

export default App

