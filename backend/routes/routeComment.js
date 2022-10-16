const routeComment = require("express").Router();
const {
  addComment,
  deleteComment,
  updateComment,
} = require("../controllers/comments");

routeComment.post("/add", addComment);
routeComment.post("/delete", deleteComment);
routeComment.update("/update", updateComment);

module.exports = routeComment;
