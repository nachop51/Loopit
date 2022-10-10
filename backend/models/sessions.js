const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Sessions = sequelize.define("Sessions", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    // Model attributes are defined here
    token: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
},
    {
        // Other model options go here
        timestamps: true,
        createdAt: "create_at",
        updatedAt: "update_at",
    }
)

module.exports = Sessions;