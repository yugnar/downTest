let express = require("express");
const passport = require("passport");
let router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) console.log(err);
    if (!user) res.status(409);

    res.status(200);
  })(req, res);
});

module.exports = router;
