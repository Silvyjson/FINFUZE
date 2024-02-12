import React from "react";
import { Button, Input } from "../Other-component/form";
import InputFormField from "../form/InputFormField";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../form/SubmitButton";
import AppForm from "../form/AppForm";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
});

/////////////////
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
};

const currentYear = new Date().getFullYear();
////////////////////////
function Footer() {
  const initialValue = {
    email: "",
  };
  const subscribe = function (value) {
    console.log(value);
  };
  return (
    <footer className="footer_section">
      <div className="newsletter-section">
        <h1>Newsletter</h1>
        <p>
          Subscribe to our newsletter to get your weekly dose of news, updates,
          tips and special offers
        </p>
        <form action="" className="newsletter-form">
          <div className="form_container">
            <AppForm
              initialValues={initialValue}
              onSubmit={(values) => subscribe(values)}
              validationSchema={validationSchema}
            >
              <InputFormField
                name="email"
                // label="Email"
                type="email"
                placeholder="E.g johndoe@email.com"
                className="subscribe-input-style"
              />
              {/* <div className="subscribe_input">
                
              </div> */}

              <SubmitButton title="subscribe" />
            </AppForm>
          </div>
        </form>
      </div>
      <div className="footer-container">
        <div className="footer_logo-container">
          <img
            src="./image/Finfuze logo 1 2.png"
            alt="logo"
            className="footer-logo"
          />
        </div>

        <FooterLinks
          title="Contact Information"
          links={["Company address", "Phone number", "Email address"]}
        />
        <FooterLinks
          title="Navigation Links"
          links={[
            "About Us",
            "Contact Us",
            "FAQ",
            "Terms of Service",
            "Privacy Policy",
          ]}
        />
        <FooterLinks
          title="Social Media Links"
          links={["Twitter", "LinkedIn", "Facebook", "Instagram"]}
        />
      </div>
      <div className="footer-copyright">
        <p>Copyright © {currentYear} Finfuze.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
