const routeUser = require("express").Router();
const { getUsers, getFavoritesUser } = require("../controllers/users");

//define routes for user
routeUser.get("/all", getUsers);
routeUser.get("/favorites/:id", getFavoritesUser);

module.exports = routeUser;
