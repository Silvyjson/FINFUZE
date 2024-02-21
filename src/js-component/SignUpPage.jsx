import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "./Other-component/Form";
import Navigation from "./Other-component/Navigation";

function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
        return passwordRegex.test(password);
    };

    const signUpAuth = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            setError("Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await sendEmailVerification(auth.currentUser);
            setMessage(`A verification email has been sent to ${email}. Please check your inbox.`);

            setError(null);

        } catch (error) {

            setMessage(null);
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already in use. Please sign in.");
            } else {
                setError("Account creation failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spin size="3x" />
                </div>
            ) : (
                <section className="entryForm-section">
                    <Navigation nav="/" src="./image/Finfuze logo 1 2.png" className="footer-logo" />
                    <div className="entryForm-container">
                        <h1>Welcome</h1>
                        <p>Create an account</p>
                        {message && <b className="message">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            {message}
                        </b>}
                        {error && <b className="error-message">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            {error}
                        </b>}
                        <form onSubmit={signUpAuth} className="entry-form">
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
                        <span className="entryFormnavi-link">
                            Already have an account?<Navigation label="Login " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" />
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default SignUpComponent;
