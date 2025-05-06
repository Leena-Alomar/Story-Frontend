
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Link, useLocation, Navigate } from "react-router-dom";

// COMPONENTS
import HomePage from "../HomePage";
import CategoryIndexPage from "../CategoryIndexPage/CategoryIndexPage";
import SignupPage from "../SignupPage/signup";
import StoryFormPage from "../StoryFormPage";
import WelcomePage from "../WelcomePage/welcome";
import StoryDetail from "../StoryDetailPage/StoryDetailIndex";
import ReviewPage from "../ReviewPage/ReviewPAgeIndex";  
// import Navbar from "../../components/Navbar/Navbar";
import LikePage from "../LikePage/LikePageIndex";

import { getUser } from "../../utilities/users-api";

function App() {
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
        <div className={`header-logo-container`}></div>
      </header>
            {/* <nav>
              <ul className="nav1">
                
              <Navbar user={user} setUser={setUser} />
              </ul>
            </nav> */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        
        {user ? (
          <>
  
            <Route path="/home" element={<HomePage setUser={setUser} />} />
            <Route path="/Category" element={<CategoryIndexPage />} />
            <Route path="/story" element={<StoryFormPage />} />
            <Route path="/story/new/:categoryId" element={<StoryFormPage createStory={true} user={user} />} />
            <Route path="/story/edit/:id" element={<StoryFormPage editStory={true} user={user} />} />
            <Route path="/story/confirm_delete/:id" element={<StoryFormPage deleteStory={true} user={user}  />} />
            <Route path="/story/:id" element={<StoryDetail user={user} setUser={setUser} />} />
            <Route path="/story/:id/review/new" element={<ReviewPage user={user} />} />
            <Route path="/story/:id/like/new" element={<LikePage user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>

            <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
            <Route path="/home" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
