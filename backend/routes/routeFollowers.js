const routeFollower = require("express").Router();
const { addFollower, deleteFollower } = require("../controllers/followers");

routeFollower.post("/add", addFollower);
routeFollower.post("/delete", deleteFollower);
routeFollower.post("/add", addFollower);

module.exports = routeFollower;
