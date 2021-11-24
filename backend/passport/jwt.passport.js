const passport = require("passport");
const jwtStart = require("passport-jwt").Strategy;
const jwtExtractor = require("passport-jwt").ExtractJwt;
const userSchema = require("../schemas/user.schemas");

const ops = {
  jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
  secretOrKey: "elrafamalo",
};

passport.use(
  new jwtStart(ops, async (jwt_payload, done) => {
    userSchema.findById(jwt_payload.id, (err, user) => {
      if (err) return done(null, false);
      if (!user) return done(null, false);

      return done(null, user.id);
    });
  })
);
