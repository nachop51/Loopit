const Follower = require("../models/followers");

const addFollower = (req, res) => {
  const { user_id, username } = req.body;
  if (!user_id || !username) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  Follower.create({
    user_id: user_id,
    follow_id: username,
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
