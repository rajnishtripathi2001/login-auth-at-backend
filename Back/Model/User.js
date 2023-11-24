const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;
