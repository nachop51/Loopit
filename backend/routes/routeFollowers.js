const routeFollower = require("express").Router();
const { addFollower, deleteFollower } = require("../controllers/followers");

routeFollower.post("/add/:follow_id", addFollower);
routeFollower.delete("/delete/:username", deleteFollower);

module.exports = routeFollower;
