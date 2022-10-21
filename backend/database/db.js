const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

//config connection of mysql database with mysql2
const conexion = mysql.createPool({
  connectionLimit: 10,
  host: process.env.IP_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB,
});

//config sequelize for use mysql database
const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASS_DB,
  {
    host: process.env.IP_DB,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = { conexion: conexion, sequelize: sequelize };
