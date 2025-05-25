// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';


// IMAGES
import Reading from "../../assets/images/reading.png";
// APIs
import * as usersAPI from "../../utilities/users-api.js"

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "" }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });
    let disabledSubmitBtn = Object.values(errors).every(val => val === "") && Object.values(formData).every(val => val !== "") ? false : true

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }


    function checkErrors({ target }) {
        const updateErrors = { ...errors }

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
        }
        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
        }
        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
        }
        if (target.name === 'email') {
            updateErrors.email = !target.value.includes("@") ? "Your password must be a real email / include the '@' symbol." : "";
        }

        setErrors(updateErrors);
    };

    async function handleSubmit(evt) {
        try {
            evt.preventDefault()
            const newUser = await usersAPI.signup(formData);
            setUser(newUser);
            setFormData(initialState)
            navigate("/home")
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }

    return (<>
        <div className="page-header">
            <img className="Reading" src={Reading} alt="read1 icon" />
         
        </div>
        <form onSubmit={handleSubmit} className="form-container-signup">
            <div className="form-header">
                <FontAwesomeIcon
                    icon={faCircleChevronLeft}
                    className="prev1"
                    onClick={() => navigate("/welcome")}
                    style={{ cursor: "pointer" }}
                /> 
                <h1 className="signup">Get Started !</h1>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th><label htmlFor="id_username"></label></th>
                        <td>
                            <input placeholder="Username:" className="in" type="text" value={formData.username} name="username" minLength="3" maxLength="150" onChange={handleChange} />
                            <br/>
                            { errors.username && <p>{errors.username}</p> }
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_email"></label></th>
                        <td>
                            <input placeholder="Email:" className="in" type="text" value={formData.email} name="email" minLength="3" maxLength="150" onChange={handleChange} />
                            <br/>
                            { errors.email && <p>{errors.email}</p> }
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_password1"></label></th>
                        <td>
                            <input placeholder="Password:" className="in" type="password" value={formData.password} name="password" minLength="3" onChange={handleChange} />
                            <br/>
                            { errors.password && <p>{errors.password}</p> }
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_password2"></label></th>
                        <td>
                            <input placeholder="Password confirmation:" className="in" type="password" value={formData.confirmPassword} name="confirmPassword" onChange={handleChange}/>
                            <br/>
                            { errors.confirmPassword && <p>{errors.confirmPassword}</p> }
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" disabled={disabledSubmitBtn} className="btn-submit">Submit!</button>
        </form>
    </>)
}