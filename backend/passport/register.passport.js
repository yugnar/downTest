const passport = require("passport");
const userSchema = require("../schemas/user.schemas");
const LocalStrategy = require("passport-local").Strategy;

let signUpCallback = (username, password, done) => {
  userSchema.findOne({ username: username }, async (err, user) => {
    if (err) return done(null, false);
    if (user) return done(null, false);
    let newUser = new userSchema({
      username: username,
      password: password,
    });

    let users = await newUser.save();
    return done(null, users);
  });
};

passport.use("signup", new LocalStrategy(signUpCallback));
