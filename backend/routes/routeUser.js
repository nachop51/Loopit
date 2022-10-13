const routeUser = require("express").Router();
const { getUsers, getFavoritesUser , getUserById } = require("../controllers/users");

//define routes for user
routeUser.get("/all", getUsers);
routeUser.get("/:id", getUserById);
routeUser.get("/favorites/:id", getFavoritesUser);

module.exports = routeUser;
