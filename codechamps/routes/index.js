var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');

router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: true }));
router.use(bodyParser.json());
router.use(session({secret: "123abcg"}));

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
});



var filePath = '/home/ubuntu/codechamps';

/* GET home page. */
router.get('/', function(req, res) {
 
 console.log("ROUTES WORKED");
 var username = req.session.username;
 var password = req.session.password;
 console.log("The username is: " + username);
 res.sendFile(path.join(filePath + '/webapp/Home.html'));
 
});

/* GET home page. */
router.get('/Account.html', function(req, res) {
 
 var username = req.session.username;
 var password = req.session.password;
	

console.log("The username is: " + username);
 
 if(username && password){
  res.sendFile(path.join(filePath + '/webapp/Account.html'));
 }
 
 else {
 
 res.sendFile(path.join(filePath + '/webapp/Account.html'));
 console.log("The cookie ID" + req.cookie);
 console.log("The SessionID" + req.sessionID);
 console.log("ROUTES WORKED: Account Page");
 
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
						req.session.user_name = username;
      						console.log("The username is: " + username);
						res.redirect('/Home.html');
					}
				});
			}
		}
	});
});

//add new user to database
app.post('/CreateAccount.html', function(req, res) {
	var table = "user";
	var username = req.body.user_name;
	var age = req.body.user_age;
	var email = req.body.user_email;
	var firstname = req.body.first_name;
	var lastname = req.body.last_name;
	var gender = req.body.gender;
	var occupation = req.body.user_occupation;
	
	var db = new AWS.DynamoDB();
	
	console.log(username);
	var paramsgetuser = {
		TableName:table,
		Key : {"username" : {S: username}},
		AttributesToGet: [ "username" ]
	};
	
	//check if username exists in database
	db.getItem(paramsgetuser, function(err, data){
		if(err) {
			console.log(err);
		}
		else {
			console.log(data);
			if(data.Item == null){ //add user if non-existent
				var docClient = new AWS.DynamoDB.DocumentClient();
				
				const saltRounds = 10;
				bcryptjs.genSalt(saltRounds, function(err, salt) {
					bcryptjs.hash(req.body.user_password, salt, function(err, hash){
						//user tuple
						var params = {
							TableName:table,
							Item:{
								"username": username,
								"age": age,
								"email": email,
								"firstname": firstname,
								"gender": gender,
								"lastname": lastname,
								"occupation": occupation,
								"password": hash,
							}
						};

						console.log("Adding a new item...");
						//put user in database
						docClient.put(params, function(err, data) {
							if (err) {
								console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
							} else {
								console.log("Added user:", JSON.stringify(data, null, 2));
							}
						});
					});
				});
				res.redirect('/Home.html');
			}
			else{
				res.redirect('/CreateAccount.html');
			}
		}
	});
});	

	
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
 
 	if(username && password){
  		res.sendFile(path.join(filePath + '/webapp/PracticeMode.html'));
 	}
	else{
		res.sendFile(path.join(filePath + '/webapp/Account.html'));
	}
 
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

var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
db.listTables(function(err, data) {
console.log(data);	

module.exports = router;
