const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

//config connection of mysql database with mysql2
const conexion = mysql.createPool({
  connectionLimit: 10,
  host: "54.94.125.72",
  user: "loopit",
  password: "loop",
  database: "loopit",
});

//config sequelize for use mysql database
const sequelize = new Sequelize("loopit", "loopit", "loop", {
  host: "54.94.125.72",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { conexion: conexion, sequelize: sequelize };
