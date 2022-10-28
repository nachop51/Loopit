const User = require("../models/users");
const Loop = require("../models/loops");
const Comment = require("../models/comments");

const addComment = async (req, res) => {
  const { content, loop_id } = req.body;
  if (!content || !loop_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const user_id = req.id;
    const loop = await Loop.findByPk(loop_id);
    console.log("holaaaaaa");
    if (!loop) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - loop does not exist",
      });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        Error: "Bad Request - user does not exist",
      });
    }
    const new_comment = await Comment.create({
      user_id: user_id,
      loop_id: loop_id,
      content: content,
    });
    await loop.increment("count_comments");
    res.status(200).json({
      status: "OK",
      count_comments: loop.count_comments,
      data: new_comment,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  if (!comment_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const comment_destroy = await Comment.findByPk(comment_id);
    if (!comment_destroy) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - comment id does not exist",
      });
    }
    await comment_destroy.destroy();
    const loop = await Loop.findByPk(comment_destroy.loop_id);
    await loop.decrement("count_comments");
    res.status(200).json({
      status: "OK",
      count_comments: loop.count_comments,
      data: [],
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - missing data",
    });
  }
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - comment id does not exist",
      });
    }
    const { content } = req.body;
    if (content) {
      Comment.content = content;
    }
    await comment.save();
    res.status(200).json({
      status: "OK",
      content: content,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

// HACER FUNCION PARA TRAER TODOS LOS COMENTARIOS DE UN LOOP

module.exports = {
  addComment: addComment,
  deleteComment: deleteComment,
  updateComment: updateComment,
};
