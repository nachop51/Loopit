const routeUser = require("express").Router();
const {
  getUsers,
  getSaveUser,
  updateUser,
  me,
  getUserByusername,
} = require("../controllers/users");

//define routes for user
routeUser.get("/me", me);
routeUser.put("/update/:id", updateUser);
routeUser.get("/all", getUsers);
routeUser.get("/profile/:username", getUserByusername);
routeUser.get("/saves/:id", getSaveUser);

module.exports = routeUser;
