const express = require("express");
let router = express.Router();
const userSchema = require("../schemas/user.schemas");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findById(req.user, async (err, doc) => {
      if (err) return res.status(500).send("Server error");
      if (doc) {
        doc.urls.push(req.body.url);
        await doc.save();

        return res.send("Guardado exitoso");
      }
    });
  }
);

module.exports = router;
