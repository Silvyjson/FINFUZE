import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
// import { Formik } from "formik";
export const Input = ({
  placeholder,
  type,
  className,
  onChange,
  htmlFor,
  label,
  onBlur,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="inputFormStyle">
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={
          type === "password" ? (isPasswordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        className={`InputStle ${className}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="password-container">
        {type === "password" && (
          <img
            src={
              isPasswordVisible
                ? "./image/view-off.png"
                : "./image/view-off.png"
            }
            alt="password-view-icon"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
};

export const Button = ({ onClick, className, text, to }) => {
  return (
    <button
      type="submit"
      className={`buttonStyle ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const HeaderButton = (props) => {
  const { label, className } = props;

  return <button className={`headerButton ${className}`}>{label}</button>;
};

export default HeaderButton;
