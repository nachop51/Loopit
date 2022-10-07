import "./Loopit.css";
import Nav from "./components/Nav";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../assets/loading_spinner.gif";
import LoopList from "./components/LoopList";
import FooterApp from "./components/FooterApp";

const LoopitApp = ({ userStatus }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <Nav />
      <div className="loop-container">
        <LoopList />
      </div>
      <FooterApp />
    </>
  );
};

export default LoopitApp;
