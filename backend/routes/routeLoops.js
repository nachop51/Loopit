const routeLoops = require("express").Router();
const { addLoop, deleteLoop, updateLoop } = require("../controllers/loops");
const { route } = require("./routeAuth");

//define routes for loops
routeLoops.post("/add", addLoop);
routeLoops.delete("/delete", deleteLoop);
routeLoops.put("/update", updateLoop);

module.exports = routeLoops;
