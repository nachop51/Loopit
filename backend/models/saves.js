const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const User = require("./users");
const Loop = require("./loops");

const Save = sequelize.define(
  "Saves",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
    loop_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Save;
