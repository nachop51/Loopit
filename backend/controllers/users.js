const User = require("../models/users");
const Loop = require("../models/loops");
// const Favorite = require("../models/favorites");
const Language = require("../models/languages");

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

const getFavoritesUser = async (req, res) => {
  // const { id } = req.params;
  // if (!id) {
  //   return res.status(400).json({
  //     status: "Error",
  //     error: "Bad Request - Missing data",
  //   });
  // }
  // try {
  //   const user = await User.findByPk(id);
  //   if (!user) {
  //     return res.status(404).json({
  //       status: "Error",
  //       error: "User not found",
  //     });
  //   }
  //   const favorites = await User.findAll({
  //     attributes: ["username"],
  //     include: [
  //       {
  //         model: Loop,
  //         as: "loops",
  //         attributes: ["name"],
  //         include: [
  //           {
  //             model: Language,
  //             as: "language",
  //             attributes: ["name"],
  //           },
  //           {
  //             model: Favorite,
  //             as: "favorites",
  //           },
  //         ],
  //       },
  //     ],
  //     where: { id: id },
  //   });
  //   return res.status(200).json({
  //     status: "OK",
  //     favorites: favorites,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     status: "Error",
  //     error: error,
  //   });
  // }
};

const getUserByNames = (req, res) => {};

// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  getUsers: getUsers,
  getFavoritesUser: getFavoritesUser,
};
