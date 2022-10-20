const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database/db");

//define model for user
const User = sequelize.define(
  "Users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
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
    theme: {
      type: DataTypes.STRING(20),
      defaultValue: "light",
    },
    editorTheme: {
      type: DataTypes.STRING(20),
      defaultValue: "vs-dark",
    },
  },
  {
    // Other model options go here
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
