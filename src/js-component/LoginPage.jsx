import React from "react";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";

function LoginComponent() {

    return (
        <section className="entryForm-section">
            <img src="./image/Finfuze logo 1 2.png" alt="logo" />
            <div className="entryForm-container">
                <h1>Login</h1>
                <p>Hi, welcome back</p>
                <form action="" className="entry-form">
                    <Input label="Email" type="email" placeholder="E.g johndoe@email.com" required />
                    <Input label="Password" type="password" placeholder="Enter your password" required />
                    <div className="formAdditional-info">
                        <span>
                            <input type="checkbox" />
                            <label htmlFor="Remember me">Remember me</label>
                        </span>
                        <span className="highlighted-text">Forgot password?</span>
                    </div>
                    <Button label="Create an account" className="entryFormButton" />
                </form>
                <span>Not registered yet? <Navigation label="Create an account" nav="/signUp-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
        </section>
    );
}

export default LoginComponent;