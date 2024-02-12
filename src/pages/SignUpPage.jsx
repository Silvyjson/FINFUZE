import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LinkButton from "../js-component/LinkButton";
import {
  AppForm,
  InputFormField,
  SubmitButton,
} from "../js-component/form/index";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
function SignUpComponent() {
  function submitForm(values) {
    console.log(values);
  }
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  return (
    <section className="entryForm-section">
      <Link to="/">
        <img src="./image/Finfuze logo 1 2.png" alt="logo" />
      </Link>
      <div className="entryForm-container">
        <h1>Welcome</h1>
        <p>Create an account</p>
        <form action="" className="entry-form">
          <AppForm
            initialValues={initialValues}
            onSubmit={(values) => submitForm(values)}
            validationSchema={validationSchema}
          >
            <InputFormField name="firstName" label="First name" type="text" />

            <InputFormField name="lastName" label="Last name" type="text" />

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

            <SubmitButton title="create an account" />
          </AppForm>
        </form>
        <span>
          Already have an account?{" "}
          <LinkButton to="/login">
            LogIn
            <img src="./image/arrow-up-right-01.png" alt="null" />
          </LinkButton>
        </span>
      </div>
    </section>
  );
}

export default SignUpComponent;
