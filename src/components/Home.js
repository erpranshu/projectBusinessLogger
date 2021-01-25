import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import logo from '../images/Homepage.svg'

export default function Home() {
  

  return (
    
    <div className="row homeMainBox container">
      <div className="col-lg-6 col-sm-12 homeTitleBox">
       <h1 className="homeTitle">Welcome! grow your business with us.</h1> 
    </div>
    <div className="col-lg-6 col-sm-12 homeLogoBox">
      <img className="homeImage" src={logo}/>
    </div>
    </div>
   
  )
    
}