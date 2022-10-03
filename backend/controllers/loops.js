const conexion = require("../database/db");
const mpq = require("mysql-query-placeholders");

const addLoop = (req, res) => {
  const { name, description, content, user_id } = req.body;
  if (!name || !description || !content || !user_id || !language) {
    return res.status(400).json({
      status: "Error",
      error: "Missing data",
    });
  }
  let query = "SELECT * loops WHERE name ?";
  conexion.query(query, { name: name }, (errors, results) => {
    if (errors) {
      res.status(500).json({
        status: "Error",
        error: errors,
      });
    } else if (results.length !== 0) {
        res.status(400).json({
            status: "Error"
            error: "Already exist a loop with this name"
        })
    } else {
        query = "INSERT"
    }
  });
};

const getAllLoops = (req, res) => {
  let query = "SELECT * FROM loops";
  conexion.query(query, (errors, results) => {
    if (errors) {
      res.status(500).json({
        status: "Error - Internal Server Error",
        error: errors,
      });
    } else {
      res.status(200).json({
        status: "OK",
        data: results,
      });
    }
  });
};

const getLoopsByLanguage = (req, res) => {
  let { language } = req.params;
  let query = "SELECT * FROM loops WHERE ? ";
  conexion.query(query, { language: language }, (errors, results) => {
    if (errors) {
      res.status(500).json({
        status: "Error",
        error: errors,
      });
    } else {
      res.status(200).json({
        status: "OK",
        data: results[0],
      });
    }
  });
};

module.exports = {
  getAllLoops: getAllLoops,
  getAllLoops: getAllLoops,
};
