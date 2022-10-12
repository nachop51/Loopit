import "./Loopit.css";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../assets/loading_spinner.gif";
// import Footer from "../Footer";
import LoopList from "./LoopList";
import Aside from "./Aside";

const LoopitApp = ({ userStatus }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <main className="loop-container">
        <LoopList />
        <Aside />
      </main>
    </>
  );
};

export default LoopitApp;
