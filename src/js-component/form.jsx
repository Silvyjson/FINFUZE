import React from "react";

export const Inputs = (props) => {
  const {placeholder,type, className } = props;

  return (
    <input type={type} placeholder={placeholder} className={`InputStle ${className}`}/>
  );
}

export const Button = (props) => {
  const { label, className } = props;

  return (
    <button className={`buttonStyle ${className}`}>{label}</button>
  );
};

const HeaderButton = (props) => {
  const { label, className } = props;

  return (
    <button className={`headerButton ${className}`}>{label}</button>
  );
};

export default HeaderButton;