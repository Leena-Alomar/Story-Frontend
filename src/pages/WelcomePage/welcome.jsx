import "./styles.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Read2 from "../../assets/images/book2.png";
import Read1 from "../../assets/images/book3.png";

const Welcome = () => {
  const navigate = useNavigate();
  const [btnOp, setBtnOp] = useState("");

  function handleBtnClick(e,des) {
    e.preventDefault()
    navigate(des);
  }

  return (
    <div className="welcome-div">
      <img className="read1" src={Read1} alt="read1 icon" />
     
      <div className="register-container">
        <h1 className="head">Welcome To Tales</h1>
        <p className="par">Tell your stories, connect with readers,and explore a world ofcreativity, Start writing or<br></br>   dive into stories from writers around the globe.</p>
        <div className="register-btns">
          <button className="btn1" onClick={(e) => handleBtnClick(e,'/home')}>Login</button>
          <button className="btn2" onClick={(e) => handleBtnClick(e,'/signup')}>SignUp</button>
        </div>
      </div>
      <img className="read2" src={Read2} alt="read icon" />
    </div>
  );
}

export default Welcome;
