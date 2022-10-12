const Feedback = () => {
  return (
    <div className="loop-info">
      <div className="heading-comments">
        <span>24👍&nbsp;</span>
        <br />
        <span></span>
      </div>
      <div className="loop-info-buttons">
        <div className="action-comment" title="positive-vote">
          👍
        </div>
        <div>Comment</div>
        <div className="action-comment" title="negative-vote">
          🤩
        </div>
      </div>
    </div>
  );
};

export default Feedback;
