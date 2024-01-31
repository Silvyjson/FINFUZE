import React from "react";
import { Button, Inputs } from "./form";

function Footer() {
    return (
        <footer className="footer">
            <span>
                <h1>Newsletter</h1>
                <p>Subscribe to our newsletter to get your weekly dose of news, updates, tips and special offers</p>
                <div>
                    <Inputs placeholder="Enter your email address" />
                    <img src="./image/mail-02.png" alt="mail-logo" />
                </div>
                <Button label="Subscribe" />
            </span>
            <div className="footer-container">
                <div className="footer-logo">
                    <img src="./image/Finfuze logo 1 2.png" alt="logo" />
                </div>
                <div className="footer-links">
                </div>
            </div>
        </footer>
    );
}

export default Footer;