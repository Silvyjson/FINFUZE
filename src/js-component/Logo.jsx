import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="logo_container">
        <img src="./image/Finfuze logo 2 1.png" alt="logo" className="logo" />
      </div>
    </Link>
  );
}

export default Logo;
