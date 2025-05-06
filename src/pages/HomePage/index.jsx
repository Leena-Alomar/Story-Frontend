// IMPORTS
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";

// IMAGES
import Reading from "../../assets/images/reading.png";
// APIs
import * as usersAPI from "../../utilities/users-api";


export default function HomePage({ user, setUser }) {
  const initialState = { username: "", password: "" }
  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate();
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  async function handleLogin(evt) {
      try {
        evt.preventDefault();
        const loggedInUser = await usersAPI.login(formData);
        setUser(loggedInUser);
        navigate("/category");
      } catch (err) {
        setUser(null);
      }
  }

  return (<>
  <div className="first">
    <section className="logo-container">
        <img className="Reading" src={Reading} alt="read1 icon" />
      <div className="home-container">
      </div>
    </section>
    {!user &&
      <section>
        <form onSubmit={handleLogin} className="form-container-login">
          <h1 className="login">Weclome Back !</h1>
          <p className="login-par">Your next story is just a click away,Embrace your imagination and <br></br> begin crafting the next chapter of your journey. </p>
          <p>
            <label htmlFor="id_username"></label>
            <input  placeholder="User Name" className="in6"   value={formData.username} type="text" name="username" maxLength="150" required id="id_username" onChange={handleChange}/>
          </p>
          <p>
            <label htmlFor="id_password"></label>
            <input  placeholder="Password" className="in6" value={formData.password} type="password" name="password" required id="id_password" onChange={handleChange} />
          </p>
          <button  type="submit" className="btn-login">Login</button>
        </form>
      </section>
    
    }  </div>
  </>)
}