import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthDetails } from "./Other-component/AuthDetails";
import { Button, Input } from "./Other-component/form";
import Navigation from "./Other-component/Navigation";

function ResetPasswordComponent() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const resetPasswordAuth = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully");
            setError("An email has been sent to you.");
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
            
            setError("Error resetting password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="entryForm-section">
            <Navigation nav="/" src="./image/Finfuze logo 1 2.png" />
            <div className="entryForm-container">
                <h1>Reset Password</h1>
                {error && <p className="error-message">{error}</p>}
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
                <span><Navigation label="Return to login page " nav="/login-page" src="./image/arrow-up-right-01.png" className="highlighted-text naviPropstyle" /></span>
            </div>
            <AuthDetails />
        </section>
    );
}

export default ResetPasswordComponent;
