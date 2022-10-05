const routeAuth = require("express").Router();
const { register, login } = require("../controllers/auth");

routeAuth.post("/register", register);
routeAuth.post("/login", login);
module.exports = routeAuth;
