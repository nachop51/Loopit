const User = require("./users");
const Loop = require("./loops");

User.hasMany(Loop, {
  as: "loops",
  foreignKey: "user_id",
  onDelete: "cascade",
  hooks: true,
});
// Loop.belongsTo(User, { as: "user" });

// Loop.belongsToMany(User, { through: "favourites" });
// User.belongsToMany(Loop, { through: "favourites" });

// Loop.belongsToMany(User, { through: "follows" });
// User.belongsToMany(Loop, { through: "follows" });
