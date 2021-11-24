const passport = require("passport");
const JwtStrat = require("passport-jwt").Strategy;

let cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["session"];
  return token;
};

const ops = {
  jwtFromRequest: cookieExtractor,
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
