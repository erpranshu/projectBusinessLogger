import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var history = useHistory();
  return (
    <div className="container LoginMainBox">
      <h3 className="loginRegisterTitle">Register Yourself</h3>
      <input
        className="my-1 form-control col-sm-5 "
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        className="my-1 form-control col-sm-5 "
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <button
        className="btn btn-sm btn-primary my-1n loginButton"
        onClick={() => {
          props.registerHandler(email, password);
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

export default RegisterForm;
