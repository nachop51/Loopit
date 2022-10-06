const routeAuth = require("express").Router();
const {
  register,
  login,
  verifyTokenUser,
  logout,
} = require("../controllers/auth");

//define routes for auth
routeAuth.post("/register", register);
routeAuth.post("/login", login);
routeAuth.get("/verify", verifyTokenUser);
routeAuth.get("/logout", logout);

module.exports = routeAuth;
