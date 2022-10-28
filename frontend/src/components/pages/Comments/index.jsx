import "./Comments.css";
import loopit from "../../../api/loopit";
import LoopItem from "../../LoopList/LoopItem";
import LoadEditor from "../../Editor";
import User from "../../LoopList/LoopItem/User";
import LoadingSpinner from "../../../assets/Loading.gif";

import { FaCommentSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Comments = () => {
  const { id } = useParams();
  const [loop, setLoop] = useState(null);
  const [code, setCode] = useState("");
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    const fetchLoop = async () => {
      try {
        const response = await loopit.get(`/loops/comments/${id}`);
        console.log(response.data.loop);
        setLoop(response.data.loop);
      } catch (error) {
        console.log(error);
        setLoop(false);
      }
    };
    fetchLoop();
  }, [id]);

  useEffect(() => {
    if (commented) {
      setCommented(false);
      setCode("");
      const fetchLoop = async () => {
        try {
          const response = await loopit.get(`/loops/comments/${id}`);
          setLoop(response.data.loop);
        } catch {
          setLoop(false);
        }
      };
      fetchLoop();
    }
  }, [commented, id]);

  const handleSubmit = async () => {
    if (code === "" || code.length > 1000) return;

    try {
      await loopit.post("/comments/add", { content: code, loop_id: loop.id });
      setCommented(true);
    } catch {}
  };

  if (loop === null) {
    return (
      <>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </>
    );
  }

  if (loop === false) {
    return (
      <main>
        <h1 className="heading-primary">Loop not found</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="comments">
        <h1 className="heading-primary">Comments</h1>
        <LoopItem loop={loop} collection={"created"} />
        <div className="add-comment-container">
          <h2 className="heading-secondary">Add a comment</h2>
          <LoadEditor
            width={"80%"}
            height={"300px"}
            language={loop.language.name}
            setCode={setCode}
          />
          {/* description */}
          <button
            className="add-comment-btn btn btn--primary"
            onClick={() => handleSubmit()}
          >
            Create
          </button>
        </div>
        <div className="comments-container">
          <div className="comments-list">
            {loop.Comments.length === 0 ? (
              <div className="no-comments-container">
                {" "}
                <FaCommentSlash className="icon-comments" />{" "}
                <h2 className="heading-primary">No comments yet</h2>
              </div>
            ) : (
              loop.Comments.map((comment) => {
                return (
                  <div className="comment" key={comment.id}>
                    <div className="commment-author">
                      <User
                        username={comment.username}
                        time={comment.created_at}
                      />
                    </div>
                    <div className="loop-content-comment">
                      <SyntaxHighlighter
                        language={loop.language.name}
                        style={atomOneDark}
                        showLineNumbers
                        lineProps={{
                          style: {
                            whiteSpace: "pre-line",
                            width: "100%",
                          },
                        }}
                      >
                        {comment.content}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Comments;
