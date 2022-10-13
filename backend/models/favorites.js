const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const User = require("./users");
const Loop = require("./loops");

const Favorite = sequelize.define(
  "Favorites",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
  },
  {
    // Other model options go here
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);

module.exports = Favorite;
