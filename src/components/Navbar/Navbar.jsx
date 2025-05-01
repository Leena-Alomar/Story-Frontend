// imports
import "./styles.css";
import { useNavigate, Link } from "react-router";

// APIs
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    // will refresh state and set us back to home without a user
    function handleLogout() {
        usersAPI.logout()
        setUser(null);
        navigate("/")
    }

    if (!user) {
        return (
            <>

                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/home">Home</Link></li>
            </>
        )
    }

    if (user)
        return (
            <>
                <li><Link to="/category">Category</Link></li>
                <form id="logout-form" onSubmit={handleLogout}>
                    <button type="submit">Log out</button>
                </form>
            </>
        )

}