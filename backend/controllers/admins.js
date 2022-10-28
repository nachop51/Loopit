const key = process.env.KEY;
const Admin = require("../models/admins");
const User = require("../models/users");

const addAdmin = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    cont idAdmin = req.id;
    const admin = await Admin.findByPk(idAdmin);
    if (!admin) {
        return res.status(400).json({
            status: "Error",
            error: "Bad Request - Admin does not exist",
        });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        status: "Error",
        error: "Bad Request - User does not exist",
      });
    }
    const admin = await Admin.create({
      user_id: user_id,
    });
    res.status(200).json({
      status: "OK",
      data: admin,
    });
  } catch (error) {}
};

const deleteAdmin = async (req, res) => {
  const { admin_id } = req.params;
  if (!admin_id) {
    return res.status(400).json({
      status: "Error",
      error: "Bad Request - Missing data",
    });
  }
  try {
    const admin = await Admin.findByPk(admin_id);
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
