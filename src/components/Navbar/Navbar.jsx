// imports
import "./styles.css";
import { useNavigate, Link } from "react-router-dom"; 

// APIs
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault(); 
    usersAPI.logout();
    setUser();
    navigate("/");
  }

  return (
    <>
    { user ?
      <>
        <ul className="navul">
          <li>
            <Link className="links" to="/category">Stories</Link>
            <Link className="links" to="/category">Favorites</Link>
          </li> 
        </ul>
        <form id="logout-form" onSubmit={handleLogout}>
          <button className="submit-logout" type="submit">Log out</button>
        </form>
      </>
      :
      <> 
        <Link className="links1" to="/category">Home</Link>
        <Link className="links1" to="/category">Contact</Link>
        <Link className="links1" to="/category">About</Link>
      </>
    }
    
</>
)}