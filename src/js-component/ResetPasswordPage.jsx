import { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "./Other-component/FormProps";
import Navigation from "./Other-component/Navigation";

function ResetPasswordComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetPasswordAuth = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage(`A password reset email has been sent to ${email}. Please check your inbox.`);
        } catch (error) {
            setError("Error resetting password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const haddleNavigate = () => {
        navigate("/login-page")
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
                        <h1>Forgot password?</h1>
                        <div className="error-message-container">
                            {message && <b className="message">
                                <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                {message}
                            </b>}
                            {error && <b className="error-message">
                                <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
                                {error}
                            </b>}
                        </div>
                        <form onSubmit={resetPasswordAuth} className="entry-form">
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
                            <Button
                                label={loading ? "Reseting..." : "Reset"}
                                className="entryFormButton"
                                disabled={loading}
                            />
                        </form>
                        <span onClick={haddleNavigate} className="naviPropstyle"><img src="./image/arrow-left-02.png" alt="" />Back to login</span>
                    </div>
                </section>
            )}
        </>
    );
}

export default ResetPasswordComponent;
