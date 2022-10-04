const Loop = require("../models/loops");

const addLoop = (req, res) => {
  const { name, description, content, languages, filename, user_id } = req.body;
  if (
    !name ||
    !description ||
    !content ||
    !languages ||
    !filename ||
    !user_id
  ) {
    return res.status(400).json({
      state: "Error",
      error: "Bad Request - Missing data",
    });
  }
  Loop.create({
    name: name,
    description: description,
    content: content,
    languages: languages,
    filename: filename,
    user_id: user_id,
  })
    .then((loops) => {
      res.status(200).json({
        state: "Added",
        data: loops,
      });
    })
    .catch((error) => {
      let errorBD = error.parent.errno;
      if (errorBD === 1452) {
        res.status(400).json({
          state: "Error",
          error: "Bad Request - This user does not exist",
        });
      } else {
        res.status(400).json({
          state: "Error",
          error: error,
        });
      }
    });
};

module.exports = {
  addLoop: addLoop,
};
