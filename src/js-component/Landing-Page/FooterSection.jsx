import React from "react";
import { Button, Input } from "../Other-component/Form";

const FooterLinks = (props) => {
    const { title, links } = props;

    return (
        <div className="footer-links">
            <h3>{title}</h3>
            {links.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer_section">
            <span className="newletter-section">
                <h1>Newsletter</h1>
                <p>Subscribe to our newsletter to get your weekly dose of news, updates, tips and special offers</p>
                <form action="" className="nesletter-form">
                    <div>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="newsletterStyle"
                        />
                        <img src="./image/mail-02.png" alt="mail-logo" className="mail-logo" />
                    </div>
                    <Button label="Subscribe" />
                </form>
            </span>
            <div className="footer-container">
                <img src="./image/Finfuze logo 1 2.png" alt="logo" className="footer-logo" />
                <FooterLinks
                    title="Contact Information"
                    links={[
                        "Company address",
                        "Phone number",
                        "Email address"
                    ]}
                />
                <FooterLinks
                    title="Navigation Links"
                    links={[
                        "About Us",
                        "Contact Us",
                        "FAQ",
                        "Terms of Service",
                        "Privacy Policy"
                    ]}
                />
                <FooterLinks
                    title="Social Media Links"
                    links={[
                        "Twitter",
                        "LinkedIn",
                        "Facebook",
                        "Instagram"
                    ]}
                />
            </div>
            <div className="footer-copyright">
                <p>Copyright © 2021 Finfuze.</p>
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;