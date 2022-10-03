const routeAuth = require("express").Router();
const conexion = require("../database/db");
const auth = require("../controllers/auth");

routeAuth.post("/register", auth.register);
routeAuth.post("/login", auth.login);
routeAuth.post("/updatepass", auth.updatePass);
module.exports = routeAuth;
