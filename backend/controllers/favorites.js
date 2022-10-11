const User = require("../models/users");

const addFavorite = async (req, res) => {
  const { user_id, loop_id } = req.body;
  if (!user_id || !loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const user = await User.findByPk(user_id);
    console.log(user);
    console.log(loop_id);
    const add_favorite = await user.addLoop(loop_id);
    res.status(200).json({
      status: "OK",
      data: add_favorite,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteFavorite = async (req, res) => {
  const { user_id, loop_id } = req.body;
  if (!user_id || !loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const delete_favorite = await Favorite.destroy({
      where: { user_id: user_id, loop_id: loop_id },
    });
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

module.exports = {
  addFavorite: addFavorite,
  deleteFavorite: deleteFavorite,
};
