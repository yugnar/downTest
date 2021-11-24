var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongo = require("mongoose");

mongo.connect(
  "mongodb+srv://uptime:uptime@uptime-cluster.fw0nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => console.log("conexion mongo")
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var loginRoute = require("./routes/login");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/login", loginRoute);

module.exports = app;
