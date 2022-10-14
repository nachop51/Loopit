const User = require("../models/users");
const Loop = require("../models/loops");
const Language = require("../models/languages");
const Save = require("../models/saves");
const { sequelize } = require("../database/db");
const { key } = require("../config");
const jwt = require("jsonwebtoken");

// Falta: - Agregar metodo para buscar usuarios por username
//        - Metodo para eliminar usuarios

const me = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(301).json({
      status: "error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const token_decode = await jwt.verify(token, key);
    const user = await User.findByPk(token_decode.userId, {
      attributes: ["id", "username", "email", "full_name"],
    });
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    res.status(200).json({
      status: "OK",
      me: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
    });
  }
};

const getUsers = (req, res) => {
  User.findAll({
    include: [
      {
        model: Loop,
        as: "loops",
        attributes: ["id", "name", "description", "content"],
      },
    ],
  })
    .then((users) => {
      list_users = [];
      users.forEach((user) => {
        const { id, username, email, full_name } = user.dataValues;
        list_users.push({
          id: id,
          full_name: full_name,
          username: username,
          email: email,
          loops: user.dataValues.loops.length,
        });
      });
      res.status(200).json({
        status: "OK",
        users: list_users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        error: error,
      });
    });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const { full_name, email, username } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - User does not exist",
      });
    }
    if (full_name) {
      user.full_name = full_name;
    }
    if (email) {
      const emailExist = await User.findOne({
        where: { email: email },
      });
      if (emailExist) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - Username already exist",
        });
      }
      user.email = email;
    }
    if (username) {
      const userExist = await User.findOne({
        where: { username: username },
      });
      if (userExist) {
        return res.status(400).json({
          status: "Error",
          error: "Bad Request - Username already exist",
        });
      }
      user.username = username;
    }
    await user.save();
    res.status(200).json({
      status: "OK",
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      Error: error,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "full_name"],
    });
    res.status(200).json({
      status: "OK",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
    });
  }
};

const getLoopsByUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const loops = await Loop.findAll({
      where: { user_id: id },
      include: [
        {
          model: Language,
          as: "language",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      status: "OK",
      loops: loops,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const getSaveUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const data = await sequelize.query(
      "SELECT Saves.loop_id,Loops.name, Loops.description, Loops.content, Users.username as owner  FROM Saves JOIN Loops ON Saves.loop_id = Loops.id JOIN Users ON Saves.user_id = Users.id WHERE Saves.user_id = ?;",
      {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
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

const getUserByNames = (req, res) => {};

// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  me: me,
  updateUser: updateUser,
  getUsers: getUsers,
  getUserById: getUserById,
  getSaveUser: getSaveUser,
  getLoopsByUser: getLoopsByUser,
};
