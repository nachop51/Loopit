const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");

const getUser = (req, res) => {
  if (req.params.username) {
    let { username } = req.params;
    let query = "SELECT * FROM users WHERE ?";
    conexion.query(query, { username: username }, (errors, results) => {
      if (errors) {
        res.status(404).json({
          status: "Error",
          error: errors,
        });
      } else if (results.length !== 0) {
        res.status(200).json({
          status: "OK",
          data: results[0],
        });
      } else {
        res.status(200).json({
          status: "Error",
          error: "Username not exists",
        });
      }
    });
  } else {
    query = "SELECT * FROM users";
    conexion.query(query, (errors, results) => {
      if (errors) {
        res.status(404).json({
          status: "Error",
          error: errors,
        });
      } else {
        res.status(200).json({
          status: "OK",
          data: results,
        });
      }
    });
  }
};

module.exports = {
  getUser: getUser,
};
