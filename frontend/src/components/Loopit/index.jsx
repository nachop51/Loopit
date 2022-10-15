import "./Loopit.css";
import LoopList from "./LoopList";
import Aside from "./Aside";
import Footer from "../Footer";

const LoopitApp = ({ children }) => {
  return (
    <>
      <main className="loops">
        <div className="loop-container">
          {children}
          <LoopList />
          <Aside />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default LoopitApp;
