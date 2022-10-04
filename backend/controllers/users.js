const { User } = require("../models/users");
const { Loop } = require("../models/loops");

const getUsers = (req, res) => {
  const data = User.findAll({ include: Loop })
    .then((users) => {
      res.status(200).json({
        state: "Success",
        data: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        state: "Error",
        error: error,
      });
    });
};
// Here we export the module, in order to use it in routes/routeUser
module.exports = {
  getUsers: getUsers,
};
