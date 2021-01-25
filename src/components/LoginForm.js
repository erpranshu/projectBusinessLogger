import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var history = useHistory();

  return (
    <div className="container LoginMainBox">
      <h3 className="loginRegisterTitle">Login</h3>
      <input
        className="form-control  col-sm-5"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        className="form-control  col-sm-5"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <button
        className="btn btn-sm btn-primary my-1n loginButton"
        onClick={() => {
          props.loginHandler(email, password);
        }}
      >
        Submit
      </button>
      {props.error ? (
        <div style={{ textAlign: "left", color: "red" }}>{props.error}</div>
      ) : null}
    </div>
  );
};

export default LoginForm;
