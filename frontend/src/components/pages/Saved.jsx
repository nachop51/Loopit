import LoopList from "../LoopList";

import "./Saved.css";

const Saved = () => {
  return (
    <main className="container-saved">
      <h1 className="heading-saved">Loops saved</h1>
      <div className="loop-container">
        <LoopList endpoint="/users/saves" />
      </div>
    </main>
  );
};

export default Saved;
