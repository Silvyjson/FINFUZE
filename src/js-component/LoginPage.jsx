import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthDetails } from "./Other-component/AuthDetails";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";

function LoginComponent() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signInAuth = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
            }).catch((error) => {
                console.log(error)
            })
    }


    return (
        <section className="entryForm-section">
            <img src="./image/Finfuze logo 1 2.png" alt="logo" />
            <div className="entryForm-container">
                <h1>Login</h1>
                <p>Hi, welcome back</p>
                <form onSubmit={signInAuth} className="entry-form">
                    <Input
                        label="Email"
                        htmlFor="email"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="E.g johndoe@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        htmlFor="password"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="formAdditional-info">
                        <span>
                            <input type="checkbox" id="RememberMe" />
                            <label htmlFor="RememberMe">Remember me</label>
                        </span>
                        <span className="highlighted-text">Forgot password?</span>
                    </div>
                    <Button label="Create an account" className="entryFormButton" />
                </form>
                <span>Not registered yet? <Navigation label="Create an account" nav="/signUp-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
            <AuthDetails/>
        </section>
    );
}

export default LoginComponent;