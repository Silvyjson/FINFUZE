import React from "react";
import HeaderButton from "../Other-component/form";
import Navigation, { Menubar } from "../Other-component/Navigation";

function Header() {

  return (
    <section className="header_section">
      <span>
        <nav className="header_nav-section">
          <img src="./image/Finfuze logo 2 1.png" alt="logo" />

          <ul className="navElement">
            <li>Home</li>
            <li>Manage</li>
            <li>Solution</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <ul className="navElement navlist">
            <li><Navigation label="Login " nav="/login-page" /></li>
            <li><Navigation label="Sign Up" nav="/signUp-page" /></li>
          </ul>

          <Menubar />
        </nav>

        <span className="header_content">
          <div className="header-section_intro">
            <h1>
              FinFuze: Your All-in-One Financial Hub for{" "}
              <b>Secure Banking, Digital Wallet, and Smart Savings</b>!
            </h1>
            <p>
              Unlock Financial Freedom with FinFuze: Seamlessly Manage, Learn,
              and Save!
            </p>

            <div className="button">
              <HeaderButton label="Get started" />
              <HeaderButton label="Learn more" className="h2button" />
            </div>
          </div>

          <div className="cube-img">
            <img src="./image/cube 3.png" alt="cube" />
          </div>
        </span>
      </span>
    </section>
  );
}

export default Header;
