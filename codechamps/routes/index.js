var express = require('express');
var path = require('path');
var router = express.Router();
var AWS = require('aws-sdk');
var bcryptjs = require('bcryptjs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var game = require('./game.js');
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: true }));
router.use(bodyParser.json());
router.use(session({secret: "123abcgz^&#$^hbgate8162QQANZBSHSHSHAPLEUTCHVH", 
	    secure: true,
            maxAge:  1800000}));

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
});

const MAX_USERS = 5;
var boxIndex = 0;

var filePath = '/home/ubuntu/codechamps';
var sess;

/* GET home page. */
router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 var username = req.session.username;
 console.log("The username is: " + username);
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
 
});

/* GET home page. */
router.get('/Account.html', function(req, res) {
 
 var username = req.session.username;
 var password = req.session.password;
 sess = req.session;
	

console.log("The username is: " + username);
 
 if(username){
  res.sendFile(path.join(filePath + '/webapp/Profile.html'));
  
 }
 
 else {
 
 res.sendFile(path.join(filePath + '/webapp/Account.html'));
 console.log("The cookie ID" + req.cookies);
 console.log("The SessionID" + req.sessionID);
 console.log("ROUTES WORKED: Account Page");
 
}});

//log user in
/*router.post('/Account.html', function(req, res) {
	var table = "user";
	var username = req.body.user_name;
	
	var db = new AWS.DynamoDB();
	console.log(username);
	var params = {
		TableName:table,
		Key : {"username" : {S: username}}
	};
	
	//get user tuple for given username (if it exists)
	db.getItem(params, function(err, data){
		if(err) {
			console.log(err);
		}
		else {
			if(data.Item == null){
				res.redirect('/Account.html');
			}
			else{
				//do not log in if username does not exist or password does not match
				bcryptjs.compare(req.body.user_password, data.Item.password.S).then(function(resp){
					if(!resp){
						console.log("User " + username + ": login UNSUCCESSFUL");
						res.redirect('/Account.html');
					}
					else{
						//need to do session stuff here...
						console.log("User  " + username + ": login SUCCESSFUL")
						req.session.user_name = username;
      						console.log("The username is: " + username);
						res.redirect('/Home.html');
					}
				});
			}
		}
	});
});
*/

/* GET home page. */
router.get('/CreateAccount.html', function(req, res) {
 
 console.log("ROUTES WORKED: Create Account");
 res.sendFile(path.join(filePath + '/webapp/CreateAccount.html'));
 
});

/* GET home page. */
router.get('/PracticeMode.html', function(req, res) {
 
 	console.log("ROUTES WORKED: PracticeMode");
	var username = req.session.username;
	var password = req.session.password;
 	
 	if(username != null){
  		res.sendFile(path.join(filePath + '/webapp/PracticeMode.html'));
 	}
	else{
		res.redirect('/Account.html');
	}
 
});

/* GET home page. */
router.get('/Versus.html', function(req, res) {
	res.redirect('/Account.html');
});

router.post('/Versus.html', function(req, res){
	var username = req.session.username;
	var language = req.body.language;
	if(username != null){
		if(language){
			res.sendFile(path.join(filePath + '/webapp/Versus.html'));
		}
		else{
			res.redirect('/Home.html');
		}
	}
	else{
		res.redirect('/Account.html');
	}
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

router.get('/Home.html', function(req, res) {
	console.log("Routes worked, welcome to the home page");
	res.sendFile(path.join(filePath + '/webapp/Home.html'));
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

router.post('/Account.html', function(req, res) {
	var table = "user";
	var username = req.body.user_name;
	
	var db = new AWS.DynamoDB();
	console.log(username);
	var params = {
		TableName:table,
		Key : {"username" : {S: username}}
	};
	
	//get user tuple for given username (if it exists)
	db.getItem(params, function(err, data){
		if(err) {
			console.log(err);
		}
		else {
			if(data.Item == null){
				res.redirect('/Account.html');
			}
			else{
				//do not log in if username does not exist or password does not match
				bcryptjs.compare(req.body.user_password, data.Item.password.S).then(function(resp){
					if(!resp){
						console.log("User " + username + ": login UNSUCCESSFUL");
						res.redirect('/Account.html');
					}
					else{
						//need to do session stuff here...
						console.log("User  " + username + ": login SUCCESSFUL")
						req.session.username = username;
						var sID = boxIndex++;
						if(boxIndex > MAX_USERS){
							boxIndex = 0;
						}
						req.session.sID = sID;
      						console.log("The username is: " + username + " and their box ID is: " + sID);
						res.redirect('/Home.html');
					}
				});
			}
		}
	});
});

module.exports = router;
