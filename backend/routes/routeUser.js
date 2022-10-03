const routeUser = require("express").Router();
const { getUser } = require("../controllers/users");

routeUser.get("/getUser/:username", getUser);
routeUser.get("/getUser/", getUser);

module.exports = routeUser;
