import React from "react";
import { Button, Input } from "./Other-component/form";

import LinkButton from "./LinkButton";
import { Link } from "react-router-dom";

function LoginComponent() {
  return (
    <section className="entryForm-section">
      <Link to="/">
        <img src="./image/Finfuze logo 1 2.png" alt="logo" />
      </Link>

      <div className="entryForm-container">
        <h1>Login</h1>
        <p>Hi, welcome back</p>
        <form action="" className="entry-form">
          <Input
            label="Email"
            type="email"
            placeholder="E.g johndoe@email.com"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="formAdditional-info">
            <span>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </span>
            <span className="highlighted-text">Forgot password?</span>
          </div>
          <Button label="Create an account" className="entryFormButton" />
        </form>
        <span>
          Not registered yet?
          <LinkButton to="/SignUp">
            Create an Account
            <img src="./image/arrow-up-right-01.png" alt="null" />
          </LinkButton>
        </span>
      </div>
    </section>
  );
}

export default LoginComponent;
