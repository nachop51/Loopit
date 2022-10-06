const User = require("./users");
const Loop = require("./loops");

//define relationships one to many between user and loops
User.hasMany(Loop, {
  as: "loops",
  foreignKey: "user_id",
  sourceKey: "id",
  onDelete: "cascade",
});
Loop.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
  targetId: "id",
});

//define relationships many to many between loops and user (favorites)
Loop.belongsToMany(User, {
  as: "usersFavorites",
  through: "Favorites",
  foreignKey: "loop_id",
  otherKey: "user_id",
  onDelete: "cascade",
});
User.belongsToMany(Loop, {
  as: "loopsFavorites",
  through: "Favorites",
  foreignKey: "user_id",
  otherKey: "loop_id",
  onDelete: "cascade",
});

// Loop.belongsTo(User, { as: "user" });

// User.hasMany(Blog, {
//   foreignKey: "user_id",
// });
// Blog.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Loop.belongsToMany(User, { through: "favourites" });
// User.belongsToMany(Loop, { through: "favourites" });

// Loop.belongsToMany(User, { through: "follows" });
// User.belongsToMany(Loop, { through: "follows" });
