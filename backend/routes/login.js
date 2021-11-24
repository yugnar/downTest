let express = require("express");
const passport = require("passport");
let router = express.Router();
let jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  passport.authenticate("login", { session: false }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      res.status(409).send("Autenticación fallida");
      return;
    }

    let token = jwt.sign({ id: user._id }, "elrafamalo", { expiresIn: "8hr" });

    res
      .cookie("session", token, { maxAge: 90000000 })
      .send("Autenticación exitosa");
  })(req, res);
});

module.exports = router;
