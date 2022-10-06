const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Language = sequelize.define(
  "Languages",
  {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
  }
);

module.exports = Language;
