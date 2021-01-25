import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import "bootstrap/js/src/collapse.js"

import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css";
const NavbarBeforeLogin = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
            </button>
          <Link to="/" className="navbar-brand">
            BusinessLogger
          </Link>
          
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Register"
                  className="nav-link active"
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
     );
}
 
export default NavbarBeforeLogin;