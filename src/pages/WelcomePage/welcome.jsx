import "./styles.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Read2 from "../../assets/images/book2.png";
import Read1 from "../../assets/images/book3.png";

const Welcome = () => {
  const navigate = useNavigate();
  const [btnOp, setBtnOp] = useState("");

  function handleBtnClick(des) {
    navigate(des);
  }

  return (
    <div className="welcome-div">
       <div className="book-con"> </div>
      <img className="Read1" src={Read1} alt="read1 icon" />
     
      <h1 className="head">Welcome To My Story</h1>
      <p className="par">Tell your stories, connect with readers,and explore a world ofcreativity, Start writing or<br></br>   dive into stories from writers around the globe.</p>
      <div className="btnn">
        <button className="btn1" onClick={() => handleBtnClick('/home')}>Login</button>
        <button className="btn2" onClick={() => handleBtnClick('/signup')}>SignUp</button>
      </div>
      <div className="book2-con"> </div>
      <img className="Read" src={Read2} alt="read icon" />
    </div>
  );
}

export default Welcome;
