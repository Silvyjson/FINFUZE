import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HeaderButton from "../Other-component/FormProps";
import Navigation, { Menubar } from "../Other-component/Navigation";

const HeaderLinkList = (props) => {
  const { list, clasS } = props;

  const toggleGet = () => {
    const navScroll = document.querySelector(clasS);

    navScroll.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <li onClick={toggleGet}>{list}</li>
  );
}

function Header() {
  const navigate = useNavigate();

  function toggleList() {

    const menuIcon = document.querySelector(`.headersection-menu-icon`)

    const navElements = document.querySelectorAll(`.navElement`);

    menuIcon.classList.toggle("open");

    navElements.forEach(navElement => {
      navElement.classList.toggle("open_nav");
    });

  }

  useEffect(() => {
    const closeMenuOnBodyClick = (event) => {
      const menuIcon = document.querySelector(`.headersection-menu-icon`);
      const navElements = document.querySelectorAll(`.navElement`);

      if (!menuIcon.contains(event.target) && !navElements[0].contains(event.target)) {
        menuIcon.classList.remove("open");

        navElements.forEach(navElement => {
          navElement.classList.remove("open_nav");
        });
      }
    };

    document.body.addEventListener('click', closeMenuOnBodyClick);
    window.addEventListener('scroll', closeMenuOnBodyClick);

    return () => {
      document.body.removeEventListener('click', closeMenuOnBodyClick);
      window.removeEventListener('scroll', closeMenuOnBodyClick);
    };
  }, []);


  const toggleNav = () => {
    navigate("/signUp-page");
  }

  const toggleScroll = () => {
    const AboutSection = document.querySelector(".aboutSection");

    AboutSection.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="header_section">
      <span>
        <nav className="header_nav-section">
          <div className="logo-menubar-container">
            <img src="./image/Finfuze logo 2 1.png" alt="logo" />
            <Menubar
              onClick={toggleList}
              className="headersection-menu-icon"
            />
          </div>

          <ul className="navElement">
            <li>Home</li>
            <li>Manage</li>
            <li>Solution</li>
            <HeaderLinkList
              list="About"
              clasS=".finfuzeArticle-section"
            />
            <HeaderLinkList
              list="Contact"
              clasS=".footer_section"
            />
          </ul>

          <ul className="navElement navlist">
            <li><Navigation label="Login " nav="/login-page" /></li>
            <li><Navigation label="Sign Up" nav="/signUp-page" /></li>
          </ul>
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
              <HeaderButton label="Get started" className="h1button" onClick={toggleNav} />
              <HeaderButton label="Learn more" className="h2button" onClick={toggleScroll} />
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
