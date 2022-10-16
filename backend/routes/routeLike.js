const routeLike = require("express").Router();
const { addLike } = require("../controllers/likes");

//define routes for likes
routeLike.post("/add", addLike);

module.exports = routeLike;
