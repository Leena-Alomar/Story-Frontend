import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";
import * as storyAPI from "../../utilities/story-api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [allSearch, setAllSearch] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [FilterSearch, SetFilterSearch] = useState([]);

  useEffect(() => {
    async function getAllSearch() {
      try {
        const storyData = await storyAPI.index();
        setAllSearch(storyData);
      } catch (err) {
        console.error("Error fetching stories:", err);
      }
    }
    getAllSearch();
  }, []);

  const handleChange = (e) => {
    const userSearch = e.target.value;
    setUserSearch(userSearch);

    const filterItems = allSearch.filter((story) => {
      if (!story.title) return false;
      return story.title.toLowerCase().includes(userSearch.toLowerCase());
    });

    SetFilterSearch(filterItems);
  };

  function handleLogout(e) {
    e.preventDefault();
    usersAPI.logout();
    setUser(null);
    navigate("/");
  }

  return (
    <>
      {user && (
        <ul className="navul">
          <li>
            <Link className="links" to="/category">Stories</Link>
          </li>
          <li>
            <input
              type="text"
              value={userSearch}
              onChange={handleChange}
              placeholder="      Type something to search"
              className={`search-input ${userSearch ? 'no-icon' : ''}`}
            />
            {userSearch && (
              <ul className="search-results">
                {FilterSearch.length > 0 ? (
                  FilterSearch.map((story) => (
                    <li key={story.id}>
                      <Link to={`/story/${story.id}`}>{story.title}</Link>
                    </li>
                  ))
                ) : (
                  <li>No matching stories found</li>
                )}
              </ul>
            )}
          </li>
          <li>
            <button className="submit-logout" onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
