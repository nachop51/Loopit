import "./Loopit.css";
import LoadLoops from "./LoadLoops";
import Aside from "./Aside";
import Footer from "../Footer";

const LoopitApp = () => {
  return (
    <>
      <main className="loops">
        <div className="loop-container">
          <LoadLoops />
          <Aside />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default LoopitApp;
