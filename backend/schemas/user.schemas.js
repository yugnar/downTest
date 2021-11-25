const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

let historialSchema = new Schema({
  url: String,
  date: String,
});

let userSchema = new Schema({
  username: String,
  password: String,
  urls: [{ type: String }],
  downTable: [historialSchema],
});

let users = mongoose.model("users", userSchema, "users");
module.exports = users;
