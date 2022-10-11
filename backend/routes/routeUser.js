const routeUser = require("express").Router();
const { getUsers } = require("../controllers/users");

//define routes for user
routeUser.get("/all", getUsers);

module.exports = routeUser;
