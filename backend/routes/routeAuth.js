const routeAuth = require("express").Router();
const { register, login, verifyTokenUser } = require("../controllers/auth");

routeAuth.post("/register", register);
routeAuth.post("/login", login);
routeAuth.get("/verify", verifyTokenUser);
module.exports = routeAuth;
