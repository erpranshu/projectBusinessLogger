import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar =(props)=> {
  
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" className="navbar-brand">
            BusinessLogger
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              
              <li class="nav-item">
                <Link
                  to="/Invoice"
                  className="nav-link active"
                  aria-current="page"
                >
                  Invoice
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="/YourInvestment"
                  className="nav-link active"
                  aria-current="page"
                >
                  Your Investment
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/Stats"
                  className="nav-link active"
                  aria-current="page"
                >
                  Stats
                </Link>

              </li>
               <li>
               <Link to="/" className="nav-link active" onClick={props.logoutHandler}>Logout</Link>
               </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  
}
export default Navbar;
