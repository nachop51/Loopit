import "./Aside.css";

const Aside = () => {
  return (
    <aside className="aside">
      <div className="aside-container">
        <div className="item-container">
          <h2 className="aside-title">About Loopit</h2>
          <p className="aside-text">
            Loopit is a social media platform for programmers to share their
            code with the world. Create a profile, upload your code, and share
            it with your friends, followers and the world.
          </p>
          <span className="aside-view-yarn">Seguir hilo</span>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
