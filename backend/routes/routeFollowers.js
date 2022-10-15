const routeFollower = require("express").Router();
const { addFollower, deleteFollower } = require("../controllers/followers");

routeFollower.post("/add", addFollower);
routeFollower.delete("/delete", deleteFollower);

module.exports = routeFollower;
