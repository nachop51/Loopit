import "./Comments.css";
import loopit from "../../../api/loopit";
import LoopItem from "../../LoopList/LoopItem";
import LoadEditor from "../../Editor";
import User from "../../LoopList/LoopItem/User";
import LoadingSpinner from "../../../assets/nobg.gif";

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

  if (!loop) {
    return (
      <>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </>
    );
  }

  const handleSubmit = () => {
    if (code === "" || code.length > 1000) {
      return;
    }

    loopit.post(`/loops/${id}/comments`, { code });
    setCode("");
  };

  return (
    <div>
      {loop ? (
        <div className="comments">
          <h1 className="heading-primary">Comments</h1>

          <LoopItem loop={loop} collection={"created"} />
          <div className="comments-list">
            <div className="comments-container">
              <div className="commment-author">
                <User username={"Nachop hardcode"} />
              </div>
              <div className="comment-list_comment">
                <p>
                  Muy interesantes su aporte en verdad, justo estaba necesitando
                  hacer eso
                </p>
              </div>
            </div>
            <div className="comments-container">
              <div className="commment-author">
                <User username={"Nachop hardcode"} />
              </div>
              <div className="comment-list_comment">
                <p>091834859 hablenme nenas</p>
              </div>
            </div>
            <div className="comments-container">
              <div className="commment-author">
                <User username={"Nachop hardcode"} />
              </div>
              <div className="comment-list_comment">
                <p>nada que ver jajajs</p>
              </div>
            </div>
          </div>

          <div className="add-comment-container">
            <h2 className="heading-secondary">Add a comment</h2>
            <LoadEditor
              width={"80%"}
              height={"300px"}
              language={loop.language.name}
              setCode={setCode}
            />
            {/* description */}
            <button className="add-comment-btn btn btn--primary">Create</button>
          </div>

          {/* <div className="comments-container">
            <div className="comments-list">
              {loop.comments.map((comment) => {
                return (
                  <div className="comment" key={comment}>
                    <p>{comment}</p>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Comments;
