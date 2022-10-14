import "./Loopit.css";
import LoopList from "./LoopList";
import Aside from "./Aside";
import Footer from "../Footer";

const LoopitApp = ({ userStatus }) => {
  return (
    <>
      <main className="loops">
        <div className="loop-container">
          <LoopList />
          <Aside />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default LoopitApp;
