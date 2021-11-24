const passport = require("passport");
const JwtStrat = require("passport-jwt").Strategy;
const jwtExtractor = require("passport-jwt").ExtractJwt;
const userSchema = require("../schemas/user.schemas");

const ops = {
  jwtFromRequest: jwtExtractor.fromAuthHeaderAsBearerToken(),
  secretOrKey: "elrafamalo",
};

const jwtCallBack = async (token, done) => {
  try {
    return done(null, token.id);
  } catch (err) {
    done(err);
  }
};

let jwtStrategy = new JwtStrat(ops, jwtCallBack);

passport.use("jwt", jwtStrategy);
