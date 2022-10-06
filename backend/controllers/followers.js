const follower = require("../models/followers");

const addFollower = (req, res) => {
  const { user_id, user_id } = req.body;
  follower
    .create({
      user_id: user_id,
      user_id: user_id,
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
