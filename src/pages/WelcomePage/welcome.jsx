import "./styles.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Use this, not 'react-router'
import Read from "../../assets/images/pic11.png";
import Read1 from "../../assets/images/pic33.png";

const Welcome = () => {
  const navigate = useNavigate();
  const [btnOp, setBtnOp] = useState("");

  function handleBtnClick(des) {
    navigate(des);
  }

  return (
    <div className="welcome-div"> 
      <img className="Read1" src={Read1} alt="read1 icon" />
      <h1 className="head">Welcome To My Story</h1>
      
      <div className="btnn">
        <button className="btn1" onClick={() => handleBtnClick('/home')}>Login</button>
        <button className="btn2" onClick={() => handleBtnClick('/signup')}>SignUp</button>
      </div>

      <img className="Read" src={Read} alt="read icon" />
    </div>
  );
}

export default Welcome;
