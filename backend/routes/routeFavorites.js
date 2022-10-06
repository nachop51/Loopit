const routeFavorite = require("express").Router();
const addFavorite = require("../controllers/favorites");

routeFavorite.post("/add", addFavorite);

module.exports = routeFavorite;
