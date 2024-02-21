import React, { useState } from "react";

const HeaderButton = (props) => {
  const { label, className, onClick } = props;

  return (
    <button className={`headerButton ${className}`} onClick={onClick} >{label}</button>
  );
};

export const Button = (props) => {
  const { label, className, onClick } = props;

  return (
    <button type="submit" className={`buttonStyle ${className}`} onClick={onClick}>{label}</button>
  );
};

export const HomePageButton = (props) => {
  const { label, className, onClick } = props;

  return (
    <button className={`homePageButton ${className}`} onClick={onClick}>{label}</button>
  );
};

export const Input = (props) => {
  const { placeholder, type, className, htmlFor, label, id, name, value, onChange, disabled } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <span className="inputFormStyle">
      <label htmlFor={htmlFor} >{label}</label>
      <input
        type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
        placeholder={placeholder}
        className={`InputStle ${className}`}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        autoComplete="on"
      />
      <div className="password-container">
        {type === "password" && (
          <img
            src={isPasswordVisible ? "./image/view-on.png" : "./image/view-off.png"}
            alt="password-view-icon"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </span>
  );
}

export default HeaderButton;