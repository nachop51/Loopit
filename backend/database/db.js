const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
//pool de conexiones
const conexion = mysql.createPool({
  connectionLimit: 10,
  host: "54.94.125.72",
  user: "loopit",
  password: "loop",
  database: "loopit",
});

const sequelize = new Sequelize("loopit", "loopit", "loop", {
  host: "54.94.125.72",
  dialect: "mysql",
});

module.exports = { conexion: conexion, sequelize: sequelize };
