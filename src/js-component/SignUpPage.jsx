import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";

function SignUpComponent() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUpAuth = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
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
                <h1>Welcome</h1>
                <p>Create an account</p>
                <form onSubmit={signUpAuth} className="entry-form">
                    <Input
                        label="First name"
                        htmlFor="firstName"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        label="Last name"
                        htmlFor="lastName"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
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
                    <Button
                        label="Create an account"
                        className="entryFormButton"
                    />
                </form>
                <span>Already have an account? <Navigation label="Login " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
        </section>
    );
}

export default SignUpComponent;