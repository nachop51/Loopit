const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const User = sequelize.define(
  "users",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // create_At: {
    //   type: "TIMESTAMP",
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    //   allowNull: false,
    // },
    // update_At: {
    //   type: "TIMESTAMP",
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    //   allowNull: false,
    // },
  },
  {}
);

module.exports = User;
