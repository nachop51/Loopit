const { conexion } = require("../database/db");
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
        status: "Error",
        error: "Already exist a loop with this name",
      });
    } else {
      (query = "INSERT INTO loops SET ?"),
        {
          name: name,
          description: description,
          content: content,
          user_id: user_id,
          language: language,
        };
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

const getAllLoops = (req, res) => {
  let page = req.params.page;
  let query = mpq.queryBuilder(
    "SELECT * FROM users LIMIT :limit OFFSET :offset;",
    {
      limit: limit,
      offset: page * limit,
    }
  );
  conexion.query(query, (error, results) => {
    if (error) {
      res.json({
        state: "Error",
        error: error,
      });
    } else {
      res.json({
        state: "Success",
        data: results,
      });
    }
  });
};

module.exports = {
  getAllLoops: getAllLoops,
  getLoopsByLanguage: getLoopsByLanguage,
  addLoop: addLoop,
};
