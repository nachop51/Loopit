const routeLoops = require("express").Router();
const {
  addLoop,
  deleteLoop,
  updateLoop,
  getLoops,
  getLoopsbyID,
} = require("../controllers/loops");
const { route } = require("./routeAuth");

//define routes for loops
routeLoops.post("/add", addLoop);
routeLoops.delete("/delete/:id", deleteLoop);
routeLoops.put("/update/:id", updateLoop);
routeLoops.get("/all/:language", getLoops);
routeLoops.get("/all", getLoops);
routeLoops.get("/:id", getLoopsbyID);

module.exports = routeLoops;
