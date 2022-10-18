const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Like = sequelize.define(
  "Likes",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
    loop_id: {
      type: DataTypes.UUID,
      allowNull: false.valueOf,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Like;
