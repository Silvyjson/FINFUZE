import React from "react";
import Header from "../js-component/Landing-Page/Header";
import FinfuzeIntro from "../js-component/Landing-Page/Finfuze-intro";
import About from "../js-component/Landing-Page/AboutSection";
import Footer from "../js-component/Landing-Page/FooterSection";

function LandingPage() {
  return (
    <>
      <Header />
      <FinfuzeIntro />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;
