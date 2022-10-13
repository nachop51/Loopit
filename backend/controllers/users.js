const User = require("../models/users");
const Loop = require("../models/loops");
const Language = require("../models/languages");
const Favorite = require("../models/favorites");

// Falta: - Agregar metodo para buscar usuarios por username
//        - Metodo para eliminar usuarios
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
      include: [
        {
          model: Loop,
          as: "loops",
        },
      ],
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

const getFavoritesUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const favorites = await Favorite.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Loop,
          as: "loop",
          attributes: ["id", "name", "description", "content"],
        },
      ],
    });
    return res.status(200).json({
      status: "OK",
      favorites: favorites,
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
  getUsers: getUsers,
  getUserById: getUserById,
  getFavoritesUser: getFavoritesUser,
};
