const routeFollower = require("express").Router();
const { addFollower, deleteFollower } = require("../controllers/followers");

routeFollower.post("/add/:follow_id", addFollower);
routeFollower.post("/delete/:username", deleteFollower);

module.exports = routeFollower;
