import React from "react";

import { Menubar } from "../Other-component/Navigation";
import Button from "../Button";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Navigation() {
  return (
    <nav className="navigation">
      <input type="checkbox" id="nav_toggle" className="navigation_checkbox" />
      <label htmlFor="nav_toggle" className="navigation_button">
        <span className="navigation_icon">&nbsp;</span>
      </label>
      <div className="navigation_container">
        <nav className="navigation_item">
          <Logo />
          <div className="navigation_nav">
            <ul className="navElement">
              <li>Home</li>
              <li>Manage</li>
              <li>Solution</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
            <div className="navigation_buttons">
              <Button to="/login" type="secondary" width="10rem">
                Login
              </Button>
              <Button to="/signUp" type="primary" width="10rem">
                Sign Up
              </Button>
            </div>
          </div>

          {/* <Menubar /> */}
        </nav>
      </div>
    </nav>
    // <h1>navigation</h1>
  );
}

export default Navigation;
