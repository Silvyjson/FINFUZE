import React, { useState } from "react";

export const Input = (props) => {
  const { placeholder, type, className, htmlFor, label, id, name, value, onChange, disabled } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <span className="inputFormStyle">
      <label htmlFor={htmlFor} >{label}</label>
      <input type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
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
            src={isPasswordVisible ? "./image/view-off.png" : "./image/view-off.png"}
            alt="password-view-icon"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </span>
  );
}

export const Button = (props) => {
  const { label, className, onClick } = props;

  return (
    <button type="submit" className={`buttonStyle ${className}`} onClick={onClick}>{label}</button>
  );
};

export const UpdateProfileButton = (props) => {
  const { label, className, onClick } = props;

  return (
    <button className={`updateProfileButton ${className}`} onClick={onClick}>{label}</button>
  );
};

const HeaderButton = (props) => {
  const { label, className } = props;

  return (
    <button className={`headerButton ${className}`} >{label}</button>
  );
};

export default HeaderButton;