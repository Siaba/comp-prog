var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'webapp')));

app.use('/', routes);
app.use('/users', users);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket){ console.log("someone has connected."); });


server.listen(3000);

AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com"
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
	var pass = req.body.user_password;
	
	var docClient = new AWS.DynamoDB.DocumentClient();
	
	console.log(username);
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
			"password": pass
		}
	};

	console.log("Adding a new item...");
	docClient.put(params, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
	res.redirect('/index.html');
});

//write to file when submit button is clicked
app.post('/blanktext.html', function(req, res){
	var body = req.body.comments;
	var filePath = __dirname + '/webapp/test.txt';
	fs.writeFile(filePath, body ,function(){
		console.log(__dirname);
	});
});

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
