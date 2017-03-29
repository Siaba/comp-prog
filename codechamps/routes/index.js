var express = require('express');
var path = require('path');
var router = express.Router();

var filePath = '/home/ubuntu/codechamps';

/* GET home page. */
router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED: Account Page");
 res.sendFile(path.join(filePath + '/webapp/Account.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED: Create Account");
 res.sendFile(path.join(filePath + '/webapp/CreateAccount.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/PracticeMode.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Versus.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Stats.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/History.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Leaderboards.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/GroupLeaderboards.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/GroupStats.html'));
 
});

router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/FindMatch.html'));
 
});


module.exports = router;
