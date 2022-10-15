import { useState } from "react";
import { MdRecommend } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";

const Feedback = () => {
  const [save, setSave] = useState(false);
  const [like, setLike] = useState(false);

  const handleSave = () => {
    if (save) setSave(false);
    else setSave(true);
  };

  const handleLike = () => {
    if (like) setLike(false);
    else setLike(true);
  };

  return (
    <div className="loop-info">
      <div className="heading-comments">
        <br />
      </div>
      <div className="loop-info-buttons">
        <button className="action-comment" onClick={handleLike}>
          <MdRecommend className={like ? "icon recommend-active" : "icon"} />
          <span>I recomend</span>
        </button>
        <button className="comment-button">Comment..</button>
        <button className="action-comment" onClick={handleSave}>
          <IoBookmark className={save ? "icon save-active" : "icon"} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;
