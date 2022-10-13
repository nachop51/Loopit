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
    follow_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);

module.exports = Follower;
