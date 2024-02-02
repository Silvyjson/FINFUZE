import { Link } from "react-router-dom";
// import Navigation, { Menubar } from "./Other-component/Navigation";

function Header() {
  return (
    <div>
      <nav className="header_nav-section">
        <Link to="/">
          <img src="./image/Finfuze logo 2 1.png" alt="logo" />
        </Link>
      </nav>
    </div>
  );
}

export default Header;
