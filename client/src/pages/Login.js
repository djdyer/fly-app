import React from "react";

function Login() {
  return (
    <div>
      <div className="register">
        <input id="username" placeholder="user name" />
        <input id="password" placeholder="password" />
        <h5>
          {" "}
          Sign-up instead, click <a href="/signup">here</a>
        </h5>
        <button className="shadow-pop-br" id="loginBtn">
          <h1>LOG-IN</h1>
        </button>
      </div>
    </div>
  );
}

export default Login;
