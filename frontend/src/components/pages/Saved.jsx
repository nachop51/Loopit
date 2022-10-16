import LoopList from "../LoopList";

import "./Saved.css";

const Favorites = () => {
  return (
    <main className="container-saved" style={{ minHeight: "100vh" }}>
      <h1 className="heading-saved">Loops saved</h1>
      <div className="loop-container">
        <LoopList endpoint="/users/saves" />
      </div>
    </main>
  );
};

export default Favorites;
