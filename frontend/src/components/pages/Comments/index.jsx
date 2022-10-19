import "./Comments.css";
import loopit from "../../../api/loopit";
import LoopItem from "../../LoopList/LoopItem";
import LoadEditor from "../../Editor";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const [loop, setLoop] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchLoop = async () => {
      const response = await loopit.get(`/loops/comments/${id}`);
      response.data.loop.countComments = response.data.loop.comments.length;
      setLoop(response.data.loop);
    };
    fetchLoop();
  }, [id]);

  return (
    <div>
      {loop && (
        <div className="comments">
          <h1 className="heading-primary">Comments</h1>
          <LoopItem loop={loop} collection={"created"} />
          <LoadEditor
            width={40}
            height={100}
            language={loop.language.name}
            setCode={setCode}
          />
          <div className="comments-container">
            <div className="comments-list">
              {loop.comments.map((comment) => {
                return (
                  <div className="comment" key={comment}>
                    <p>{comment}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
