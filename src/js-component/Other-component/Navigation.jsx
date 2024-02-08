import React, { useRef } from "react";
import { useNavigate } from "react-router";

export function Menubar() {
  const menuIconRef = useRef(null);

  function toggleList() {
   
    const navElements = document.querySelectorAll(`.navElement`);
    
    menuIconRef.current?.classList.toggle("open");

    navElements.forEach(navElement => {
      navElement.classList.toggle("open_nav");
    });
    
  }

  return (
    <div className="menu-icon" onClick={toggleList} ref={menuIconRef}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const Navigation = (props) => {
  const { label, nav, src, className } = props;

  const navigate = useNavigate();

  const toggleNext = () => {
    navigate(nav);
  }

  return (
    <div onClick={toggleNext} className={className}>{label}<img src={src} /></div>
  );
}

export default Navigation;