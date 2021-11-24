const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongo = require("mongoose");
const passport = require("passport");

mongo.connect(
  "mongodb+srv://uptime:uptime@uptime-cluster.fw0nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => console.log("conexion mongo")
);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const loginRoute = require("./routes/login");
const signupRoute = require("./routes/register");
const saveUrl = require("./routes/saveUrl");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

require("./passport/logIn.password");
require("./passport/register.passport");
require("./passport/jwt.passport");

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/login", loginRoute);
app.use("/signup", signupRoute);

app.use("/saveUrl", saveUrl);

module.exports = app;
