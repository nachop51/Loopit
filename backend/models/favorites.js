const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

const Favorite = sequelize.define(
  "Favorites",
  {},
  {
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);

module.exports = Favorite;
