var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.use(session({secret: "123abcg"}));

var filePath = '/home/ubuntu/codechamps';

/* GET home page. */
router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
 
});

/* GET home page. */
router.get('/Account.html', function(req, res) {
 var username = req.session.username;
 var password = req.session.password;
 
 console.log("The cookie ID" + req.cookies);
 console.log("The SessionID" + req.sessionID);
 
 console.log("ROUTES WORKED: Account Page");
 res.sendFile(path.join(filePath + '/webapp/Account.html'));
 
 
 
});



/* GET home page. */
router.get('/CreateAccount.html', function(req, res) {
 
 console.log("ROUTES WORKED: Create Account");
 res.sendFile(path.join(filePath + '/webapp/CreateAccount.html'));
 
});

/* GET home page. */
router.get('/PracticeMode.html', function(req, res) {
 
 console.log("ROUTES WORKED: PracticeMode");
 res.sendFile(path.join(filePath + '/webapp/PracticeMode.html'));
 
});

/* GET home page. */
router.get('/Versus.html', function(req, res) {
 
 console.log("ROUTES WORKED: versus Match");
 res.sendFile(path.join(filePath + '/webapp/Versus.html'));
 
});

/* GET home page. */
router.get('/Stats.html', function(req, res) {
 
 console.log("ROUTES WORKED: stats");
 res.sendFile(path.join(filePath + '/webapp/Stats.html'));
 
});

/* GET home page. */
router.get('/History.html', function(req, res) {
 
 console.log("ROUTES WORKED: history page");
 res.sendFile(path.join(filePath + '/webapp/History.html'));
 
});

/* GET home page. */
router.get('/Leaderboards.html', function(req, res) {
 
 console.log("ROUTES WORKED: leaderboards");
 res.sendFile(path.join(filePath + '/webapp/Leaderboards.html'));
 
});

/* GET home page. */
router.get('/Contact.html', function(req, res) {
 
 console.log("ROUTES WORKED: contact us ");
 res.sendFile(path.join(filePath + '/webapp/Contact.html'));
 
});

/* GET home page. */
router.get('/GroupLeaderboards.html', function(req, res) {
 
 console.log("ROUTES WORKED: group LBS");
 res.sendFile(path.join(filePath + '/webapp/GroupLeaderboards.html'));
 
});

/* GET home page. */
router.get('/GroupStats.html', function(req, res) {
 
 console.log("ROUTES WORKED: group stats");
 res.sendFile(path.join(filePath + '/webapp/GroupStats.html'));
 
});

/* GET home page. */
router.get('/FindMatch.html', function(req, res) {
 
 console.log("ROUTES WORKED: find match");
 res.sendFile(path.join(filePath + '/webapp/FindMatch.html'));
 
});


module.exports = router;
