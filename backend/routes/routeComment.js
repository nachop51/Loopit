const routeComment = require("express").Router();
const {
  addComment,
  deleteComment,
  updateComment,
  getCommentsByLoop,
} = require("../controllers/comments");

routeComment.post("/add", addComment);
routeComment.post("/delete", deleteComment);
routeComment.put("/update", updateComment);
routeComment.get("/all", getCommentsByLoop);

module.exports = routeComment;
