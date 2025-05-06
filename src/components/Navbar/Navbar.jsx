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
  if (user) {
    return (
        <>
        <ul className="navul">
          <li>
            <Link className="links" to="/category">Stories</Link>
          </li> 
          <li>
            <Link className="links" to="/category">Favorites</Link>
          </li>
          <li>
            <form id="logout-form" onSubmit={handleLogout}>
              <button className="submit" type="submit">Log out</button>
            </form>
          </li>
        </ul>

        </>
    )
}

  if (!user) {
    return (
      <>   
      
        <Link className="links1" to="/welcome">Home</Link>
        <Link className="links1" to="">Contact</Link>
        <Link className="links1" to="">About</Link>
      </>
    );
  }


}
