import { Link } from "react-router-dom";

function LinkButton({ to, children }) {
  return (
    <Link to={to} className="highlighted-text naviPropstyle">
      {children}
    </Link>
  );
}

export default LinkButton;
