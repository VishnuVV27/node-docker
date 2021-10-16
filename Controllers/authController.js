const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hpassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hpassword });
    req.session.user = user;
    res.json({
      status: "Success",
      data: { user },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "User not found",
      });
    }
    const decryptPassword = await bcrypt.compare(password, user.password);
    if (decryptPassword) {
      req.session.user = user;
      res.json({
        status: "Success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
