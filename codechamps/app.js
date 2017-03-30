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






//write to file when submit button is clicked
app.post('/blanktext.html', function(req, res){
	runSandbox(req);
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
	res.redirect('/blanktext.html');
});


function runSandbox(req){
	console.log("Starting async tasks");
	async.series([function(callback){
		console.log("initializing sandbox");
		exec('isolate --box-id=1 --init', (error, stdout, stderr) => {
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
		var filePath = '/tmp/box/1/box/test.java';
		console.log("Writing to file");
		fs.writeFile(filePath, body ,function(err){
			if(err) throw err;
			console.log(__dirname);
			callback();
		});
		
	},
	
	function(callback){
		exec('cp '+ __dirname + '/Problems/helloworld.txt /tmp/box/1/box', (error,stdout,stderr) =>{
			 if(error){
				 console.error("copy file has failed");
				 return;
		 	}
			callback();
	 	});
	},
		      
	function(callback){
		 fs.symlink('/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java','/tmp/box/1/box/java',function(err){
		 	if(err) throw err;
			 console.log("java symlink has been created.");
			 callback();
		 });
	},
		      
	function(callback){
		fs.symlink('/usr/lib/jvm/java-8-openjdk-amd64/bin/javac','/tmp/box/1/box/javac',function(err){
			 if(err) throw err;
		 	console.log("javac symlink has been created.");
			callback();
		});
	},
		      
	function(callback){
		exec('isolate --processes=15 --box-id=1 --run -- javac test.java', (error, stdout, stderr) => {
			 if(error) {
				 console.error("javac failed");
				 throw error;
			 }
			callback();
		});
	},
		      
	function(callback){
		exec('isolate --processes=15 --box-id=1 --stdout=output.txt --run -- java test', (error,stdout,stderr) => {
				 if(error) {
					 console.error("test run failed");
					 return;
				 }
				callback();
		});
	},
		      
	function(callback){
		 fs.readFile('/tmp/box/1/box/output.txt' ,(err,data) => {
			 if(err) throw err;
			 fs.readFile('/tmp/box/1/box/helloworld.txt', (error, other_data) => {
			if(error) throw error;
			if(data.toString() === other_data.toString()){
				 console.log("Your output is correct.");
			 }
			 else{
				 console.log("Your output failed.");
			 }
			callback();
		 });
		 });
	}
	,function(err){
		console.log("all functions complete.");
	}});
	





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


module.exports = app;
