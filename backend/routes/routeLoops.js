const routeLoops = require("express").Router();
const { addLoop } = require("../controllers/loops");

routeLoops.post("/add", addLoop);

module.exports = routeLoops;
