const User = require("../models/users");
const Loop = require("../models/loops");
const Like = require("../models/likes");

const addLike = async (req, res) => {
  const { loop_id } = req.body;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const user_id = req.id;
    const user = await User.findByPk(user_id);
    const loop = await Loop.findByPk(loop_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - user does not exist",
      });
    }
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - loop does not exist",
      });
    }
    const new_like = await Like.create({
      user_id: user_id,
      loop_id: loop_id,
    });
    if (!new_like) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - like already exists",
      });
    }
    const add_countLike = await Loop.update(
      { count_likes: loop.count_likes + 1 },
      {
        where: {
          id: loop_id,
        },
      }
    );
    res.status(200).json({
      status: "OK",
      count_likes: loop.count_likes + 1,
      data: new_like,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteLike = async (req, res) => {
  const { loop_id } = req.body;
  if (!loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const user_id = req.id;
    const user = await User.findByPk(user_id);
    const like_delete = await Like.findAll({
      where: {
        user_id: user_id,
        loop_id: loop_id,
      },
    });
    if (!like_delete) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - like does not exist",
      });
    }
    const delete_like = await Like.destroy({
      where: {
        user_id: user_id,
        loop_id: loop_id,
      },
    });
    const loop = await Loop.findByPk(loop_id);
    await loop.decrement("count_likes");
    res.status(200).json({
      status: "OK",
      count_likes: loop.count_likes,
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
  addLike: addLike,
  deleteLike: deleteLike,
};
