import "./Loopit.css";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../assets/loading_spinner.gif";
// import Footer from "../Footer";
import LoopList from "./LoopList";

const LoopitApp = ({ userStatus }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <main className="loop-container">
        <LoopList />
        <aside>
          <h2>Loops of the week:</h2>
        </aside>
      </main>
    </>
  );
};

export default LoopitApp;
