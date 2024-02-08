import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Button, Input } from "./Other-component/Form";
import Navigation from "./Other-component/Navigation";

function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUpAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log(userCredential);

            await sendEmailVerification(auth.currentUser);
            setMessage(`A verification email has been sent to ${email}. Please check your inbox.`);

            setError(null);

        } catch (error) {
            console.error(error.code);
            console.error(error.message);

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

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is signed in");
            } else {
                console.log("User is signed out");
            }
        });
    }, []);

    return (
        <section className="entryForm-section">
            <Navigation nav="/" src="./image/Finfuze logo 1 2.png" />
            <div className="entryForm-container">
                <h1>Welcome</h1>
                <p>Create an account</p>
                {message && <p>{message}</p>}
                {error && <p className="error-message">{error}</p>}
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
                <span>
                    Already have an account?{" "}
                    <Navigation label="Login " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" />
                </span>
            </div>
        </section>
    );
}

export default SignUpComponent;
