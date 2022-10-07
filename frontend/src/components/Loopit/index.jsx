import "./Loopit.css";
import Nav from "./components/Nav";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../assets/loading_spinner.gif";

const LoopitApp = ({ userStatus }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <Nav />
    </>
  );
};

export default LoopitApp;
