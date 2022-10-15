import LoopList from "../LoopList";

const Favorites = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      <h1>Lista de loops favoritos</h1>
      <div className="loop-container">
        <LoopList endpoint="/users/saves" />
      </div>
    </main>
  );
};

export default Favorites;
