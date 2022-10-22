import "./Loopit.css";
import LoopList from "../LoopList";
import Aside from "./Aside";

const LoopitApp = () => {
  return (
    <>
      <main className="loops">
        <h1 className="heading-primary">Loops</h1>
        <div className="loop-container">
          <LoopList collection="all" oC="a" />
          <Aside oC="b" />
        </div>
      </main>
    </>
  );
};

export default LoopitApp;
