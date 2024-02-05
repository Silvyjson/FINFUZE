import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";
import AuthDetails from "./Other-component/AuthDetails";

function SignUpComponent() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUpAuth = (e) => {
        e.preventDefault();
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`
                });
            })
            .then(() => {
                console.log("Account creation successful");
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
                if (error.code === "auth/email-already-in-use") {
                    setError("Email is already in use. Please sign in.");
                } else {
                    setError("Account creation failed. Please try again.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <section className="entryForm-section">
            <Navigation nav="/" src="./image/Finfuze logo 1 2.png" />
            <div className="entryForm-container">
                <h1>Welcome</h1>
                <p>Create an account</p>
                {error && <p className="error-message">{error}</p>}
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
                        label={loading ? "Creating Account..." : "Create an account"}
                        className="entryFormButton"
                        disabled={loading}
                    />
                </form>
                <span>Already have an account? <Navigation label="Login " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
            <AuthDetails />
        </section>
    );
}

export default SignUpComponent;