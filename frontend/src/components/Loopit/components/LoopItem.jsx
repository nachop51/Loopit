import "./LoopItem.css";

const LoopItem = () => {
  return (
    <div className="loop">
      <div className="user-info">
        <div className="avatar"></div>
        <div>
          <h3>valerepetto14</h3>
          <span>At 15/12 19:10PM</span>
        </div>
        <div className="loop-buttons">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="tag"></div>
      <div className="loop-content">
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Dignissimos porro
          repudiandae, velit sint nihil illo ratione commodi ex culpa molestias,
          minus eveniet dolorum eos ut ullam quam consectetur, obcaecati
          expedita!
        </p>
      </div>
      <div className="loop-info">
        <div>
          <span>Votes&nbsp;</span>
          <span>&nbsp;Comments</span>
        </div>
        <div className="loop-info-buttons">
          <div>↑</div>
          <div>Comment</div>
          <div>↓</div>
        </div>
      </div>
    </div>
  );
};

export default LoopItem;
