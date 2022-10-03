const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");

const getUser = (req, res) => {
  // This conditional works in the case that a user wants the data of a specific user.
  if (req.params.username) {
    let { username } = req.params;
    let query = "SELECT * FROM users WHERE ?";
    // Query
    conexion.query(query, { username: username }, (errors, results) => {
      if (errors) {
        // Here, we cover the case of an Internal Server Error (500)
        res.status(500).json({
          status: "Error - Internal Server Error",
          error: errors,
        });
      // In this case, the result brought data from the database - Status 200
      } else if (results.length !== 0) {
        res.status(200).json({
          status: "OK",
          data: results[0],
        });
        // Here, we cover the case that the data doesnt match in the Database (404)
      } else {
        res.status(404).json({
          status: "Error - Not found",
          error: "Username not exists",
        });
      }
    });
  // From here, we work the case that users wants all users data.
  } else {
    query = "SELECT * FROM users";
    // Query
    conexion.query(query, (errors, results) => {
      // Here, we cover the case that there is an Internal Server Error
      if (errors) {
        res.status(500).json({
          status: "Error - Internal Server Error",
          error: errors,
        });
        // Here, the query brought data from the database, code 200
      } else {
        res.status(200).json({
          status: "OK",
          data: results,
        });
      }
    });
  }
};
// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  getUser: getUser,
};
