import "./LoopItem.css";

const LoopItem = () => {
  return (
    <div className="loop">
      <div className="user-info">
        <div className="avatar">
          <img
            src="https://i.pravatar.cc/300"
            className="avatar-img"
            alt="user-profile"
          />
        </div>
        <div>
          <h3>valerepetto14</h3>
          <span>At 15/12 19:10PM</span>
        </div>
        <div className="loop-buttons">
          <div title="Share"></div>
          <div title="Download"></div>
          <div title="Save in your list"></div>
        </div>
      </div>
      <div className="tag-container">
        <span className="tag-javascript">Javascript</span>
        <span className="tag-html">HTML</span>
        <span className="tag-css">CSS</span>
      </div>
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
        <div className="heading-comments">
          {/* <span>Votes&nbsp;</span> */}
          <span>&nbsp;View comments</span>
        </div>
        <div className="loop-info-buttons">
          <div className="action-comment" title="positive-vote">
            ↑
          </div>
          <div>Comment</div>
          <div className="action-comment" title="negative-vote">
            ↓
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoopItem;
