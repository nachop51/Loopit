const routeUser = require("express").Router();
const {
  getUsers,
  getSaveUser,
  updateUser,
  me,
  getUserByusername,
  getFollowersByUser,
  getFollowingsByUser,
  getLikesByUser,
  changeThemeMode,
  usersStats,
  loopsUsersFollowing,
} = require("../controllers/users");

//define routes for user
routeUser.get("/me", me);
routeUser.put("/update", updateUser);
routeUser.get("/all", getUsers);
routeUser.get("/profile/:username", getUserByusername);
routeUser.get("/saves", getSaveUser);
routeUser.get("/followers/:id", getFollowersByUser);
routeUser.get("/following/:id", getFollowingsByUser);
routeUser.get("/likes", getLikesByUser);
routeUser.get("/changeThemeMode", changeThemeMode);
routeUser.get("/stats", usersStats);
routeUser.get("/loopsFollows", loopsUsersFollowing);

module.exports = routeUser;
