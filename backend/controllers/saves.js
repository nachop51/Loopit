const User = require("../models/users");
const Loop = require("../models/loops");
const Save = require("../models/saves");
const { sequelize } = require("../database/db");
const jwt = require("jsonwebtoken");
const { key } = require("../config");

const addSave = async (req, res) => {
  const { loop_id } = req.body;
  const token = req.cookies.token;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const loop = await Loop.findByPk(loop_id);
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - loop does not exist",
      });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - user does not exist",
      });
    }
    const new_save = await Save.create({
      user_id: user_id,
      loop_id: loop.id,
    });
    res.status(200).json({
      status: "OK",
      data: new_save,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteSave = async (req, res) => {
  const { loop_id } = req.body;
  const token = req.cookies.token;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const token_decode = jwt.decode(token, key);
    const user_id = token_decode.userId;
    const save = await Save.findOne({
      where: { user_id: user_id, loop_id: loop_id },
    });
    if (!save) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - save does not exist",
      });
    }
    await save.destroy();
    res.status(200).json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const allSaves = async (req, res) => {
  try {
    const data = await sequelize.query(
      "SELECT Saves.loop_id,Loops.name, Loops.description, Loops.content, Users.username as owner  FROM Saves JOIN Loops ON Saves.loop_id = Loops.id JOIN Users ON Saves.user_id = Users.id;",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      status: "OK",
      saves: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

module.exports = {
  addSave: addSave,
  deleteSave: deleteSave,
  allSaves: allSaves,
};
