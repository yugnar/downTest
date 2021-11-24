const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  urls: [],
});

let users = mongoose.model("users", userSchema, "users");
module.exports = users;
