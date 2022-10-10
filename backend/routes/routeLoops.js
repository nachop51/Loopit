const routeLoops = require("express").Router();
const {
  addLoop,
  deleteLoop,
  updateLoop,
  getLoops,
  getLoopsByLanguage,
} = require("../controllers/loops");
const { route } = require("./routeAuth");

//define routes for loops
routeLoops.post("/add", addLoop);
routeLoops.delete("/delete", deleteLoop);
routeLoops.put("/update", updateLoop);
routeLoops.get("/all/:language", getLoops);
routeLoops.get("/all", getLoops);

module.exports = routeLoops;
