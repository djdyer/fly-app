import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";


function Login() {

  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (

      <div>
    <form className="register" onSubmit={handleFormSubmit}>
        <input name="email" type="email" id="email" placeholder="e-mail"
          onChange={handleChange} />
        <input name="password" type="password" id="password" placeholder="password"
          onChange={handleChange} />
      <h5>
        {/* {" "} */}
        Sign-up instead, click <a href="/signup">here</a>
      </h5>
      {
        error ? <div>
          <p className="error-text" >The provided credentials are incorrect</p>
        </div> : null
      }
      <button type="submit" className="shadow-pop-br" id="loginBtn">
        <h1>LOG-IN</h1>
      </button>
    </form>
      </div>
  );
}

export default Login;
