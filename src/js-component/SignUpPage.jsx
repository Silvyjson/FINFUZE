import React from "react";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";

function SignUpComponent() {

    return (
        <section className="entryForm-section">
            <img src="./image/Finfuze logo 1 2.png" alt="logo" />
            <div className="entryForm-container">
                <h1>Welcome</h1>
                <p>Create an account</p>
                <form action="" className="entry-form">
                    <Input label="First name" type="text" required />
                    <Input label="Last name" type="text" required />
                    <Input label="Email" type="email" placeholder="E.g johndoe@email.com" required />
                    <Input label="Password" type="password" placeholder="Enter your password" required />
                    <Button label="Create an account" className="entryFormButton" />
                </form>
                <span>Already have an account? <Navigation label="Login " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
        </section>
    );
}

export default SignUpComponent;