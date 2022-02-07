import React from "react";

function Signup() {
  return (
    <div>
      <div className="register">
        <input id="username" placeholder="user name" />
        <input id="email" placeholder="email" />
        <input id="password" placeholder="password" />
        <input id="confirm" placeholder="confirm" />
        <h5>
          {" "}
          Login instead, click <a href="/login">here</a>
        </h5>
        <button className="shadow-pop-br" id="signupBtn">
          <h1>CREATE ACCOUNT</h1>
        </button>
      </div>
    </div>
  );
}

export default Signup;
