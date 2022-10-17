const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    loop_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    creat_at: "create_at",
    update_at: "update_at",
  }
);

module.exports = Comment;
