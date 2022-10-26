import "./Feedback.css";
import loopit from "../../../api/loopit";

import { useState } from "react";
import { MdRecommend } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Feedback = ({ loop }) => {
  const [save, setSave] = useState(loop.save);
  const [like, setLike] = useState(loop.like);

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      if (save) {
        await loopit.post("/saves/delete", { loop_id: loop.id });
      } else {
        await loopit.post("/saves/add", { loop_id: loop.id });
      }
      setSave(!save);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (!like) {
        await loopit.post("/likes/add", { loop_id: loop.id });
      } else {
        await loopit.post("/likes/delete", { loop_id: loop.id });
      }
      setLike(!like);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loop-info">
      <div className="heading-comments">
        <p>
          <MdRecommend /> {loop.count_likes}
        </p>
        <p>
          <BsChat /> {loop.count_comments}
        </p>
        <p>
          <IoBookmark /> {loop.count_saves}
        </p>
      </div>
      <div className="loop-info-buttons">
        <button className="action-comment" onClick={handleLike}>
          <MdRecommend className={like ? "icon recommend-active" : "icon"} />
          <span>&nbsp;Like</span>
        </button>
        <button
          className="action-comment comment-button"
          onClick={() => navigate("/l/comments/" + loop.id)}
        >
          <BsChat className="icon" />
          <span>&nbsp;Comment</span>
        </button>
        <button className="action-comment" onClick={handleSave}>
          <IoBookmark className={save ? "icon save-active" : "icon"} />
          <span>&nbsp;Save</span>
        </button>
      </div>
    </div>
  );
};

export default Feedback;
