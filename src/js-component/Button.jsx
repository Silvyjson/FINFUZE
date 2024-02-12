import { Link } from "react-router-dom";

function Button({ type, children, width, to }) {
  if (to) {
    return (
      <Link className={`button ${type}`} style={{ width: width }} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`button ${type}`} style={{ width: width }}>
      {children}
    </button>
  );
}

export default Button;
