var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) {
    console.log("Hay un usuario")
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
