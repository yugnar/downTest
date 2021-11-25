const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongo = require("mongoose");
const passport = require("passport");
const cron = require("node-cron");
const cors = require("cors");
const request = require("request");

require("dotenv").config();

mongo.connect(process.env.MONGO_URL, () => console.log("conexion mongo"));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const loginRoute = require("./routes/login");
const signupRoute = require("./routes/register");
const saveUrl = require("./routes/saveUrl");

const app = express();

const userSchema = require("./schemas/user.schemas");
const emails = require("./utils/emailUtility");

cron.schedule("*/5 * * * *", () => {
  userSchema.find({}, (err, users) => {
    users.forEach((user) => {
      user.urls.forEach((url) => {
        request(url, function (err, res, body) {
          if (!err && res.statusCode != 200) {
            emails.sendEmailNotif(user.username, url);
            let historyTable = user.downTable;
            let newEntry = {
              url: url,
              date: new Date(Date.now()).toISOString(),
            }
            historyTable.push(newEntry);
            userSchema.findByIdAndUpdate(user._id, {downTable : historyTable}, (err, updated) => {
              console.log("Update succesful");
            })
          }
        });
      });
    });
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
let allowedOrigins = ["http://localhost:3001"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        let msg = "Unallowed access from the specified Origin";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
  })
);
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
