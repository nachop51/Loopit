const routeLoops = require("express").Router();
const { getLoops, getLoopByLanguage } = require("../controllers/loops");

routeUser.get("/getLoops/:lenguage", getLoopByLanguage);
routeUser.get("/getLoops/", getAllLoops);

module.exports = routeLoops;
