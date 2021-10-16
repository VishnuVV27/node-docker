const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

const User = mongoose.model("User", schema);
module.exports = User;
