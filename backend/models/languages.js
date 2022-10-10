const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");


const Language = sequelize.define(
  "Languages",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
  },
  {
      // Other model options go here
      timestamps: true,
      createdAt: "create_at",
      updatedAt: "update_at",
  }
)

module.exports = Language;
