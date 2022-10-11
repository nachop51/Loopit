const routeFavorite = require("express").Router();
const { addFavorite, deleteFavorite } = require("../controllers/favorites");

routeFavorite.post("/add", addFavorite);
routeFavorite.delete("/delete", deleteFavorite);

module.exports = routeFavorite;
