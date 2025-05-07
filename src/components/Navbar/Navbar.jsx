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
            <Link className="links" to="/about">About</Link>    
          </li> 
            <form id="logout-form" onSubmit={handleLogout}>
            <button className="submit-logout" type="submit">Log out</button>
            </form>
        </ul>

      </>
      :
      <> 
        <Link className="links1" to="/category">Home</Link>
        <Link className="links1" to="/about">About</Link>
      </>
    }
    
</>
)}