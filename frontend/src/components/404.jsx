import { Link } from "react-router-dom";
import Footer from "./Footer";

const divStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 20rem)",
};

const h2Style = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#fff",
};

const pStyle = {
  fontSize: "1.5rem",
  color: "#fff",
};

const ErrorPage = () => {
  return (
    <>
      <div style={divStyle}>
        <h2 style={h2Style}>404 Error</h2>
        <p style={pStyle}>
          The link you were looking for does not exist or has been removed.
        </p>
        <Link to="/home">
          <button className="btn">Go back to home</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
