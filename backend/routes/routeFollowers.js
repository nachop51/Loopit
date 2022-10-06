const routeFollower = require("express").Router();
const addFollower = require("../controllers/followers");

routeFollower.post("/add", addFollower);

module.exports = routeFollower;
