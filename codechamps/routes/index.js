var express = require('express');
var path = require('path');
var router = express.Router();

var filePath = '/home/ubuntu/codechamps';

/* GET home page. */
router.get('/', function(req, res) {
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
});

module.exports = router;
