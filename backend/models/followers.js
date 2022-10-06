const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Follower = sequelize.define(
  "Followers",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
  },
  {}
);

module.exports = Follower;
