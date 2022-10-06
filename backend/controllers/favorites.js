const favorite = require("../models/favorites");

const addFavorite = (req, res) => {
  const { user_id, loop_id } = req.body;
  console.log(user_id, loop_id);
  favorite
    .create({
      user_id: user_id,
      loop_id: loop_id,
    })
    .then((results) => {
      if (results) {
        res.status(200).json({
          status: "Favorite added",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

module.exports = addFavorite;
