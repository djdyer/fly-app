import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";


function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="register">
      <form className="registerFields" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="e-mail"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <h5>
          {/* {" "} */}
          Sign-up instead, click <Link to="/signup">here</Link>
        </h5>
        <button type="submit" className="shadow-pop-br" id="loginBtn">
          <h1>LOG-IN</h1>
        </button>
      </form>
      {error ? (
        <div>
          <p className="error-text" style={{ color: "red" }}>
            The provided credentials are incorrect
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
