const passport = require("passport");
const userSchema = require("../schemas/user.schemas");
const LocalStrategy = require("passport-local").Strategy;

let logInCallback = (username, password, done) => {
  userSchema.findOne({ username: username }, (err, user) => {
    if (!user) return done(null, false);
    if (password === user.password) return done(null, user);
  });
};

let logInStrategy = new LocalStrategy(logInCallback);

passport.use("login", logInStrategy);



