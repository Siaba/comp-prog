var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 console.log("ROUTES WORKED");
 res.sendFile(path.join(__dirname + '/webapp/Home.html'));
});

module.exports = router;
