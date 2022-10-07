const Follower = require("../models/followers");

const addFollower = (req, res) => {
  const { user_id, username } = req.body;
  Follower.create({
    user_id: user_id,
    username: username,
  })
    .then((results) => {
      if (!results) {
        res.status(200).json({
          status: "New follow added",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

module.exports = {
  addFollower: addFollower,
};
