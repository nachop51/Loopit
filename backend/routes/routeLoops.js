const routeLoops = require("express").Router();
const {
  addLoop,
  deleteLoop,
  updateLoop,
  getLoops,
  searchLoops
} = require("../controllers/loops");
const { route } = require("./routeAuth");

//define routes for loops
routeLoops.post("/add", addLoop);
routeLoops.delete("/delete", deleteLoop);
routeLoops.put("/update", updateLoop);
routeLoops.get("/all/:language", getLoops);
routeLoops.get("/all", getLoops);
routeLoops.get("/search/:search", searchLoops);

module.exports = routeLoops;
