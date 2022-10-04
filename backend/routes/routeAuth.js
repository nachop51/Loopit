const routeAuth = require("express").Router();
const { register, login, loginWithSequelize } = require("../controllers/auth");

routeAuth.post("/register", register);
routeAuth.post("/login", login);
routeAuth.post("/loginWithSequelize", loginWithSequelize);
module.exports = routeAuth;
