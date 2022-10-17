const routeComment = require("express").Router();
const {
  addComment,
  deleteComment,
  updateComment,
} = require("../controllers/comments");

routeComment.post("/add", addComment);
routeComment.delete("/delete/:comment_id", deleteComment);
routeComment.put("/update", updateComment);

module.exports = routeComment;
