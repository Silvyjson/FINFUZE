import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button, Input } from "./Other-component/Form";
import Navigation from "./Other-component/Navigation";

function LoginComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signInAuth = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                if (user && user.emailVerified) {
                    const userDocRef = doc(getFirestore(), "users", user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        navigate("/home-page");
                    } else {
                        navigate("/profile-settings-page");
                    }
                } else {
                    setError("Email not verified. Please check your inbox for the verification email.");
                    auth.signOut();
                }
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);

                switch (error.code) {
                    case "auth/invalid-credential":
                        setError("Invalid credentials. Please check your email and password.");
                        break;
                    case "auth/user-not-found":
                        setError("User not found. Please check your email or sign up.");
                        break;
                    case "auth/wrong-password":
                        setError("Invalid password. Please check your password and try again.");
                        break;
                    case "auth/too-many-requests":
                        setError("Too many unsuccessful login attempts. Please try again later.");
                        break;
                    default:
                        setError("Login failed. Please try again.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetPassword = () => {
        navigate("/reset-password");
    }

    return (
        <section className="entryForm-section">
            <Navigation nav="/" src="./image/Finfuze logo 1 2.png" />
            <div className="entryForm-container">
                <h1>Login</h1>
                <p>Hi, welcome back</p>
                {error && <p className="error-message">{error}</p>}
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
                        <span onClick={resetPassword} className="highlighted-text">Forgot password?</span>
                    </div>
                    <Button
                        label={loading ? "Logging In..." : "Login"}
                        className="entryFormButton"
                        disabled={loading}
                    />
                </form>
                <span>Not registered yet? <Navigation label="Create an account" nav="/signUp-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
        </section>
    );
}

export default LoginComponent;