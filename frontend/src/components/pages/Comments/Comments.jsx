import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loopit from "../../../api/loopit";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await loopit.get(`/loops/comments/${id}`);
      setComments(response.data.comments);
      setLoading(false);
    };
    fetchComments();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {comments !== []
            ? comments.map((comment) => (
                <div key={comment.id}>
                  <h3>{comment.name}</h3>
                  <p>{comment.body}</p>
                </div>
              ))
            : "No comments"}
        </div>
      )}
    </div>
  );
};

export default Comments;
