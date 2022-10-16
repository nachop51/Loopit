import { Link } from "react-router-dom";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 22rem)",
};

const h2Style = {
  textAlign: "center",
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#fff",
};

const pStyle = {
  fontSize: "1.5rem",
  color: "#fff",
  marginBottom: "2rem",
};

const ErrorPage = () => {
  return (
    <>
      <div style={divStyle}>
        <div>
          <h2 style={h2Style}>404 Error</h2>
          <p style={pStyle}>
            The link you were looking for does not exist or has been removed.
          </p>
        </div>
        <Link to="/">
          <button className="btn btn-expand">Go back to home</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
