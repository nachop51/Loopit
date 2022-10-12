const User = require("./users");
const Loop = require("./loops");
const Language = require("./languages");

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
  through: "Favorites",
  foreignKey: "loop_id",
  otherKey: "user_id",
  onDelete: "cascade",
});
User.belongsToMany(Loop, {
  through: "Favorites",
  foreignKey: "user_id",
  otherKey: "loop_id",
  onDelete: "cascade",
});

// define relatioship one to many between language and loops
Language.hasMany(Loop, {
  as: "loops",
  foreignKey: "language_id",
  sourceKey: "id",
  onDelete: "cascade",
});
Loop.belongsTo(Language, {
  as: "language",
  foreignKey: "language_id",
  targetId: "id",
});

// define relationship many to many between loops and user (followers)
