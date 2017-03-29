var express = require('express');
var path = require('path');
var router = express.Router();

var filePath = '/home/ubuntu/codechamps';

/* GET home page. */
router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
 
});

router.get('/Account.html', function(req, res) {
 
 console.log("ROUTES WORKED: Account Page");
 res.sendFile(path.join(filePath + '/webapp/Account.html'));
 
});

router.get('/CreateAccount.html', function(req, res) {
 
 console.log("ROUTES WORKED: Create Account");
 res.sendFile(path.join(filePath + '/webapp/CreateAccount.html'));
 
});

router.get('/PracticeMode.html', function(req, res) {
 
 console.log("ROUTES WORKED: PracticeMode");
 res.sendFile(path.join(filePath + '/webapp/PracticeMode.html'));
 
});

router.get('/Versus.html', function(req, res) {
 
 console.log("ROUTES WORKED: versus Match");
 res.sendFile(path.join(filePath + '/webapp/Versus.html'));
 
});

router.get('/Stats.html', function(req, res) {
 
 console.log("ROUTES WORKED: stats");
 res.sendFile(path.join(filePath + '/webapp/Stats.html'));
 
});

router.get('/History.html', function(req, res) {
 
 console.log("ROUTES WORKED: history page");
 res.sendFile(path.join(filePath + '/webapp/History.html'));
 
});

router.get('/Leaderboards.html', function(req, res) {
 
 console.log("ROUTES WORKED: leaderboards");
 res.sendFile(path.join(filePath + '/webapp/Leaderboards.html'));
 
});

router.get('/Contact.html', function(req, res) {
 
 console.log("ROUTES WORKED: contact us ");
 res.sendFile(path.join(filePath + '/webapp/Contact.html'));
 
});

router.get('/GroupLeaderboards.html, function(req, res) {
 
 console.log("ROUTES WORKED: group LBS");
 res.sendFile(path.join(filePath + '/webapp/GroupLeaderboards.html'));
 
});

router.get('/GroupStats', function(req, res) {
 
 console.log("ROUTES WORKED: group stats");
 res.sendFile(path.join(filePath + '/webapp/GroupStats.html'));
 
});

router.get('/FindMatch.html', function(req, res) {
 
 console.log("ROUTES WORKED: find match");
 res.sendFile(path.join(filePath + '/webapp/FindMatch.html'));
 
});


module.exports = router;
