function ErrorMessage({ error, visible }) {
  if (!visible || !error) return;
  return <p style={{ fontSize: "2rem", color: "red" }}>{error}</p>;
}

export default ErrorMessage;
