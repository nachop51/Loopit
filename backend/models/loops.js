const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

//define model for loops
const Loop = sequelize.define(
  "Loops",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    content: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);
module.exports = Loop;
