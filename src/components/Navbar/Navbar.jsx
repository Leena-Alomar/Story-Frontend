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
    setUser(null);
    navigate("/");
  }

  if (!user) {
    return (
      <>

        
        
        <ul>
          <li>
           
            <Link to="/category">Stories</Link>
          </li> 
        </ul>

        <form id="logout-form" onSubmit={handleLogout}>
          <button className="submit" type="submit">Log out</button>
        </form>
      </>
    );
  }

  return (
    <>

    </>
  );
}
