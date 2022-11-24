const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Admin = sequelize.define(
  "Admins",
  {
    user_id: {
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

module.exports = Admin;
