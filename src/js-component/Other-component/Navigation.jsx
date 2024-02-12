import React from "react";
import { useNavigate } from "react-router";

export function Menubar(props) {

  const {onClick, className} = props;

  return (
    <div className={`menu-icon ${className}`} onClick={onClick}>
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