const routeUser = require("express").Router();
const { getUsers } = require("../controllers/users");

routeUser.get("/getUser/", getUsers);

module.exports = routeUser;
