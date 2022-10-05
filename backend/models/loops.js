const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/db");

class Loop extends Model {}
Loop.init(
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
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT((length = "long")),
      allowNull: false,
    },
    languages: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Loop",
  }
);
module.exports = Loop;
