const User = require("../models/users");
const Loop = require("../models/loops");

// Falta: - Agregar metodo para buscar usuarios por username
//        - Metodo para eliminar usuarios
const getUsers = (req, res) => {
  User.findAll({
    include: [
      {
        model: Loop,
        as: "loops",
        attributes: ["id", "name", "description", "content", "languages"],
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
        data: list_users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Error",
        error: error,
      });
    });
};

// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  getUsers: getUsers,
};
