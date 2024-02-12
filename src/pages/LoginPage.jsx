import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import LinkButton from "../js-component/LinkButton";
import { AppForm, InputFormField, SubmitButton } from "../js-component/form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().min(4).required().label("Password"),
});
function LoginComponent() {
  const initialValues = {
    email: "",
    password: "",
  };
  function submitForm(values) {
    console.log(values);
  }
  return (
    <section className="entryForm-section">
      <Link to="/">
        <img src="./image/Finfuze logo 1 2.png" alt="logo" />
      </Link>

      <div className="entryForm-container">
        <h1>Login</h1>
        <p>Hi, welcome back</p>
        <form action="" className="entry-form">
          <AppForm
            initialValues={initialValues}
            onSubmit={(values) => submitForm(values)}
            validationSchema={validationSchema}
          >
            <InputFormField
              name="email"
              label="Email"
              type="email"
              placeholder="E.g johndoe@email.com"
            />

            <InputFormField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="formAdditional-info">
              <span>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </span>
              <span className="highlighted-text">Forgot password?</span>
            </div>
            <SubmitButton title="Login" />
          </AppForm>
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
