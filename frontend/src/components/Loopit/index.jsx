import "./Loopit.css";
import LoopList from "../LoopList";
import Aside from "./Aside";
import Footer from "../Footer";

const LoopitApp = () => {
  return (
    <>
      <main className="loops">
        <div className="loop-container">
          <LoopList endpoint="/loops/all" />
          <Aside />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoopitApp;
