import React, { Component, useState, useEffect } from "react";
import Navbar from "./navbar";

//import "bootstrap/js/src/collapse.js"



import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Home from "./Home";
import Stats from "./Stats";
import YourInvestment from "./yourInvestment";
import Invoice from "./Invoice";
import RegisterForm from "./RegisterForm";
import NavbarBeforeLogin from "./navbarBeforeLogin";
import LoginForm from "./LoginForm";


import {useHistory} from 'react-router-dom';
const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [error, setError] = useState("");
  const [defaultPageView, setDefaultPageView] = useState(false);
  var history=useHistory();
  useEffect(() => {
    fetch("http://localhost:5000/user/userinfo", { credentials: "include" })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setLoggedInStatus(false);
          return { success: false };
        }
      })
      .then((r) => {
        if (r.success !== false) {
          setLoggedInStatus(true);
         
        }
      });
  }, []);
  

  const registerHandler = (email, password) => {
    fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          setLoggedInStatus(true);
         
        } else {
          setError(r.err);
        }
      });
  };
  const loginHandler = (email, password) => {
    
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success === true) {
          setLoggedInStatus(true);
          
          
        
        } else {
          setError(r.err);
         
        }
      });
  };

  const logoutHandler = () => {
    return fetch("http://localhost:5000/user/logout", {
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        setLoggedInStatus(false);
        setError("");
        setDefaultPageView(true);
      }
    });
  };

  if (loggedInStatus === true) {
    return (
      <Router>
        <div className="container">
          <Redirect to="/"/>
          <Navbar logoutHandler={logoutHandler}/>
          
         
          <Route path="/" exact component={Home} />
          <Route path="/Invoice" exact component={Invoice} />
          <Route path="/YourInvestment" exact component={YourInvestment} />
          <Route path="/Stats" exact component={Stats} />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        
        <div className="container">
          <NavbarBeforeLogin />
          <Route path="/" exact component={Home} />
          <Route
            path="/Login"
            render={(props) => (
              <LoginForm loginHandler={loginHandler} loggedInStatus={loggedInStatus} error={error} />
            )}
          />
          <Route
            path="/Register"
            render={(props) => (
              <RegisterForm registerHandler={registerHandler} error={error} />
            )}
          />
        </div>
       
      </Router>
    );
  }
};
export default App;
