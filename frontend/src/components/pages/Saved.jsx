import LoopList from "../LoopList";

import "./Saved.css";

const Saved = () => {
  return (
    <main className="container-saved">
      <h1 className="heading-primary">Loops saved</h1>
      <div className="loop-container">
        <LoopList collection="saved" />
      </div>
    </main>
  );
};

export default Saved;
