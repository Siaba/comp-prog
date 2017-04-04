var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs = require('fs');
const exec = require('child_process').exec;
var async = require('async');
var bcryptjs = require('bcryptjs');
var routes = require('./routes/index');
var users = require('./routes/users');
//const nodemailer = require('nodemailer');
var app = express();


app.use('/', routes);
app.use(express.static(path.join(__dirname, 'webapp')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

				
//GET REQUEST for routing clicks to account to the login if no username pag

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){ console.log("someone has connected."); });


app.listen(3000);



AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
});

 //Email for COntact us using nodemailer, veru close most likely something stupid 
/*
app.post('/Contact.html', function(req, res) {
	 var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "gkepp13@gmail.com",
          pass: "tmobile13" 
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.nametext + ' &lt;' + req.body.emailtext + '&gt;', //grab form data from the request body object
      to: 'gkepp13@gmail.com',
      subject: 'Website contact form',
      text: req.body.tarea
  };
  // send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
	
});*/


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

//write to file when submit button is clicked
app.post('/runSandbox', function(req, res){
	
	runSandbox(req, res);
	/*exec('isolate --init', (error, stdout, stderr) => {
 	 if (error) {
   	 console.error(`exec error: ${error}`);
   	 return;
 	 }
	
 	 console.log(`stdout: ${stdout}`);
 	 console.log(`stderr: ${stderr}`);
	 var body = req.body.comments;
	 var filePath = '/tmp/box/0/box/test.java';
	 fs.writeFile(filePath, body ,function(err){
		if(err) throw err;
		console.log(__dirname);
	 });
		
	 exec('cp '+ __dirname + '/Problems/helloworld.txt /tmp/box/0/box', (error,stdout,stderr) =>{
		 if(error){
			 console.error("copy file has failed");
			 return;
		 }
	 });
		
	 fs.symlink('/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java','/tmp/box/0/box/java',function(err){
		 if(err) throw err;
		 console.log("java symlink has been created.");
	 });
	fs.symlink('/usr/lib/jvm/java-8-openjdk-amd64/bin/javac','/tmp/box/0/box/javac',function(err){
		 if(err) throw err;
		 console.log("javac symlink has been created.");
		 exec('isolate --processes=15 --run -- javac test.java', (error, stdout, stderr) => {
			 if(error) {
				 console.error("javac failed");
				 return;
			 }
			 exec('isolate --processes=15 --stdout=output.txt --run -- java test', (error,stdout,stderr) => {
				 if(error) {
					 console.error("test run failed");
					 return;
				 }
				 fs.readFile('/tmp/box/0/box/output.txt' ,(err,data) => {
					 if(err) throw err;
					 fs.readFile('/tmp/box/0/box/helloworld.txt', (error, other_data) => {
						 if(error) throw error;
						 if(data.toString() === other_data.toString()){
							 console.log("Your output is correct.");
						 }
						 else{
							 console.log("Your output failed.");
						 }
					 });
				 });
			 });
		 });
	 });
	
	});
	*/
	
});


function runSandbox(req, res){
	console.log("Starting async tasks");
	var sID = req.session.sID;
	async.series([function(callback){
		console.log("initializing sandbox " + sID);
		exec('isolate --box-id=' + sID + ' --init', (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log("sandbox created.");
			callback();
		});
		
	},
	
	function(callback){
		var body = req.body.comments;
		var filePath = '/tmp/box/' + sID + '/box/';
		switch(req.body.language){
			case 'java':
				filePath += 'test.java';
				break;
			case 'c++':
				filePath += 'test.cpp';
				break;
			default:
				break;
		}
		console.log("Writing to file");
		fs.writeFile(filePath, body ,function(err){
			if(err) throw err;
			console.log(__dirname);
			callback();
		});
		
	},
	
	function(callback){
		exec('cp '+ __dirname + '/Problems/helloworld.txt/tmp/box/' + sID + '/box', (error,stdout,stderr) =>{
			 if(error){
				 console.error("copy file has failed");
				 return;
		 	}
			callback();
	 	});
	},
		      
	function(callback){
		 var source = '';
		 var sym = '';
		 switch(req.body.language){
			 case 'java':
				 source += '/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java';
				 sym += '/tmp/box/' + sID + '/box/java';
				 break;
			 default:
				 break;
		 }
		 fs.symlink(source,sym,function(err){
		 	if(err) throw err;
			 console.log("execution symlink has been created.");
			 callback();
		 });
	},
		      
	function(callback){
		var source = '';
		var sym = '';
		switch(req.body.language){
			case 'java':
				source += '/usr/lib/jvm/java-8-openjdk-amd64/bin/javac';
				sym += '/tmp/box/' + sID + '/box/javac';
				break;
			case 'c++':
				 source += 'usr/bin/g++-5';
				 sym += '/tmp/box/' + sID + '/box/c++';
				 break;
			default:
				break;
		}
		fs.symlink(source,sym,function(err){
			
		 	console.log("compiler symlink has been created.");
			callback();
		});
	},
		      
	function(callback){
		var env = 'isolate --processes=15 --box-id=' + sID + ' --run -- ';
		switch(req.body.language){
			case 'java':
				env += 'javac test.java';
				break;
			case 'c++':
				env += 'c++ -o test test.cpp';
				break;
			default:
				break;
		}
		exec(env, (error, stdout, stderr) => {
			 if(error) {
				 console.error("compilation failed");
				 
			 }
			callback();
		});
	},
		      
	function(callback){
		var run = 'isolate --processes=15 --box-id=' + sID + '  --stdout=output.txt --stderr=error.txt --run -- ';
		switch(req.body.language){
			case 'java':
				run += 'java test';
				break;
			case 'c++':
				run += './test';
				break;
			default:
				break;
		}
		exec(run, (error,stdout,stderr) => {
				 if(error) {
					 console.error("test run failed");
					 console.log(stderr);
					callback(true,stderr);
				 }
				else{
					callback();	
				}
		});
	},
		      
	function(callback){
		 fs.readFile('/tmp/box/' + sID + '/box/output.txt' ,(err,data) => {
			 if(err) throw err;
			 fs.readFile('/tmp/box/' + sID + '/box/helloworld.txt', (error, other_data) => {
			if(error) throw error;
			if(data.toString() === other_data.toString()){
				 console.log("Your output is correct.");
				 callback(null,"Your output is correct.");
			 }
			 else{
				 console.log("Your output failed.");
				 callback(null,"Your output failed.");
			 }
			
		 });
		 });
	}
	],function(err, results){
		console.log("all functions complete.");
		res.send(results);
	});
	
}

var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
   db.listTables(function(err, data) {
   console.log(data);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
