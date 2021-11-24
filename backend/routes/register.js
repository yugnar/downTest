const express = require("express");
let router = express.Router();
const passport = require("passport");

router.post("/", (req, res) => {
  passport.authenticate("signup", { session: false }, (err, user) => {
    if (err) return res.status(500);
    if (!user) {
      res.status(409).send("usuario ya existe");
      return;
    }

    res.send("creacion exitosa");
  })(req, res);
});

module.exports = router;
