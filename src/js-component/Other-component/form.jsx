import React, { useState } from "react";

export const Input = (props) => {
  const { placeholder, type, className, required, htmlFor, label } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <span className="inputFormStyle">
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
        placeholder={placeholder}
        className={`InputStle ${className}`}
        required={required}
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
  const { label, className } = props;

  return (
    <button type="submit" className={`buttonStyle ${className}`}>{label}</button>
  );
};

const HeaderButton = (props) => {
  const { label, className } = props;

  return (
    <button className={`headerButton ${className}`}>{label}</button>
  );
};

export default HeaderButton;