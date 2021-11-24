var express = require("express");
var router = express.Router();
let passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.send("respond with a resource");
  } else {
    res.send("no hay user");
  }
});

module.exports = router;
