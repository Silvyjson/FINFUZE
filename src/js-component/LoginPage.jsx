import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "./Other-component/FormProps";
import Navigation from "./Other-component/Navigation";

function LoginComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleDisableNavigation = (event) => {
            event.preventDefault();
        };
    
        window.history.pushState(null, "", window.location.pathname);
        window.addEventListener("popstate", handleDisableNavigation);
    
        const isMobileDevice = window.innerWidth <= 600;
    
        if (!isMobileDevice) {
            window.addEventListener("popstate", handleDisableNavigation);
        }
    
        return () => {
            window.removeEventListener("popstate", handleDisableNavigation);
        };
    }, []);
    

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
        <>
            {loading ? (
                <div className="loading-spinner">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spin size="3x" />
                </div>
            ) : (
                <section className="entryForm-section">
                    <Navigation nav="/" src="./image/Finfuze logo 1 2.png" className="footer-logo" />
                    <div className="entryForm-container">
                        <h1>Login</h1>
                        <p>Hi, welcome back</p>
                        {error && <b className="error-message">
                            <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                            {error}
                        </b>}
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
                                <span className="rememberMe">
                                    <input type="checkbox" id="RememberMe" />
                                    <label htmlFor="RememberMe">Remember me</label>
                                </span>
                                <span onClick={resetPassword} className="highlighted-text">Forgot password?</span>
                            </div>
                            <Button
                                label="Login"
                                className="entryFormButton"
                                disabled={loading}
                            />
                        </form>
                        <span className="entryFormnavi-link">
                            Not registered yet? <Navigation label="Create an account" nav="/signUp-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" />
                        </span>
                    </div>
                </section>
            )}
        </>
    );
}

export default LoginComponent;