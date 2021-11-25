var express = require("express");
var router = express.Router();
const userSchema = require("../schemas/user.schemas");
let passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (req, res, next) {
  if (req.user) {
    userSchema.findById(req.user, async (err, doc) => {
      if (err) return res.status(500).send("Server error");
      if (doc) {
        console.log(doc);
        return res.send(doc);
      }
    });
  } else {
    res.send("No hay user");
  }
});

module.exports = router;