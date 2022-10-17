const routeLike = require("express").Router();
const { addLike, deleteLike } = require("../controllers/likes");

//define routes for likes
routeLike.post("/add", addLike);
routeLike.post("/delete", deleteLike);

module.exports = routeLike;
