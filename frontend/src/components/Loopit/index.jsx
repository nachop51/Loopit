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
      <main className="loops">
        <div className="loop-container">
          <LoopList />
          <Aside />
        </div>
      </main>
    </>
  );
};

export default LoopitApp;
