const key = process.env.KEY;
const Admin = require("../models/admins");
const User = require("../models/users");

const addAdmin = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    // const adminOrNot = await Admin.findByPk(req.id);
    // if (!adminOrNot) {
    //   return res.status(400).json({
    //     status: "Error",
    //     error: "Bad Request - Admin does not exist",
    //   });
    // }
    const admin = await Admin.create({
      user_id: user_id,
    });
    res.status(200).json({
      status: "OK",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const adminOrNot = await Admin.findByPk(req.id);
    if (!adminOrNot) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User is not an admin",
      });
    }
    const admin = await Admin.findByPk(user_id);
    if (!admin) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - Admin does not exist",
      });
    }
    await admin.destroy();
    res.status(200).json({
      status: "OK",
      data: admin,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      error: error,
    });
  }
};

module.exports = {
  addAdmin,
  deleteAdmin,
};
