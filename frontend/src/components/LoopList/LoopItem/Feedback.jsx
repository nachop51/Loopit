import { useState } from "react";
import { MdRecommend } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import loopit from "../../../api/loopit";

import { connect } from "react-redux";
import { updateLoops } from "../../../actions";

const Feedback = ({ loop, updateLoops, collection }) => {
  const [save, setSave] = useState(loop.save);
  const [like, setLike] = useState(loop.like);

  const handleSave = async () => {
    try {
      if (save) {
        await loopit.post("/saves/delete", { loop_id: loop.id });
        setSave(!save);
      } else {
        await loopit.post("/saves/add", { loop_id: loop.id });
        setSave(!save);
      }
      updateLoops(collection, "save", !save, loop.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (!like) {
        await loopit.post("/likes/add", { loop_id: loop.id });
        setLike(!like);
      } else {
        await loopit.post("/likes/delete", { loop_id: loop.id });
        setLike(!like);
      }
      updateLoops(collection, "like", !like, loop.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loop-info">
      <div className="heading-comments">
        <br />
      </div>
      <div className="loop-info-buttons">
        <button className="action-comment" onClick={handleLike}>
          <MdRecommend className={like ? "icon recommend-active" : "icon"} />
          <span>&nbsp;Like</span>
        </button>
        <button className="comment-button">Comment...</button>
        <button className="action-comment" onClick={handleSave}>
          <IoBookmark className={save ? "icon save-active" : "icon"} />
          <span>&nbsp;Save</span>
        </button>
      </div>
    </div>
  );
};

export default connect(null, { updateLoops })(Feedback);
