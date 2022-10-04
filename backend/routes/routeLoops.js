const routeLoops = require("express").Router();
const {
  getAllLoops,
  getLoopsByLanguage,
  addLoop,
} = require("../controllers/loops");

routeLoops.get("/getLoops/:lenguage", getLoopsByLanguage);
routeLoops.get("/getLoops/", getAllLoops);
routeLoops.post("/addLoop", addLoop);

module.exports = routeLoops;
