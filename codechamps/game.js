var fs = require('fs');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var io;

exports.initGame = function(siolib, socket){
        io = siolib;
       
        console.log("binding events"); 
        socket.on('playerJoined', playerJoined);
        socket.on('submitCode', submitCode);
        socket.on('newGame', newGame);
        socket.on('findMatch', findMatch);
        socket.on('playerLeft', playerLeft);
	socket.on('playerReady', playerReady);
}
    

function addMatch(lang, roomID, player1ID, player1BoxID, player1SocketID){
        console.log('Room id: ' + roomID + ', lang: ' + lang + 'playerID ' + player1ID );
        matches[lang][roomID] = new GameInfo(player1ID, player1BoxID, player1SocketID);
	
        //this.join(roomID);
        //console.log("game info: " + matches[lang][roomID].p1ID + " " + matches[lang][roomID].p1BoxID);
        //emit an event to the client that created the match so their browser can update screen
}

function joinMatch(lang, roomID, player2ID, player2BoxID, player2SocketID){
        matches[lang][roomID].p2ID = player2ID;
        matches[lang][roomID].p2BoxID = player2BoxID;
	matches[lang][roomID].p2SocketID = player2SocketID;
        matches[lang][roomID].numPlayers++;
        //this.join(roomID);
        //emit join event to client
}

function findMatch(data){
	var language = data.lang;
        for(var key in matches[language]){
                if(matches[language][key].numPlayers < 2){
                        //this is where you join a game instead of create one
                        joinMatch(language,key,data.uname,data.sid, this.id);
                        this.join(key);
			console.log(data.uname, " (box: ", data.sid, ") joined ", language, " ", key);
                        fs.readFile('/home/ubuntu/codechamps/webapp/gamepage.txt', function(error,data) {
                                if (!error) {
					var pagedata = data.toString();
                                        console.log('gamepage.txt read...');
					fs.readFile('/home/ubuntu/codechamps/webapp/countdown.txt', function(err,data) {
						if (!err) {
							console.log('gamepage.txt read...');
							io.sockets.in(key).emit("loadGame", 
										{page: pagedata,
										 overlay_content: data.toString(),
										 roomID: key,
										 lang: language,
										 socketID: this.id,
										 p1ID: matches[language][key].p1ID,
										 p2ID: matches[language][key].p2ID,
										 pname: matches[language][key].problemSet[0]
										});
						}
						else{
							console.log(err);
						}
					});
                                }
                                else{
                                        console.log(error);
                                }
                        });
                        return;
                }
        }
        var roomID = ( Math.random() * 100000 ) | 0;
        addMatch(data.lang, roomID, data.uname, data.sid, this.id);
        this.join(roomID);
        console.log(data.uname, " (box: ", data.sid, ") created ", data.lang, " ", roomID);
        return;
}

function playerJoined(){
        
}

function submitCode(data){
        /* call runsandbox(data)
	* 	data will contain code, lang, boxid, & problem name  ---  Is socketid needed?
	*	(data.code, data.lang, data.sid, data.pname) 		
	*	
	*	if success:
	*		update score (+10?)
	*		load new problem
	*	else:
	*		decrement score (-1?)
	*		if stderr to return:
	*			stderr string = stderr
	*		else:
	*			stderr string = empty
	*
	*	emit result to player
	*/
}

function newGame(){
        
}

//data contains 'user' for quitting user and the 'roomID' that is affected
function playerLeft(data){
	console.log("Player left game: " + data.user + " ending game...");
        endGame(data);
}

function endGame(data){/*
	var docClient = new AWS.DynamoDB.DocumentClient();
	console.log("Storing win/loss results for room " + data.roomID);
	
	//for forfeited matches, data.user will contain data
	//so this if statement will do wins+1 on winner and losses+1 on data.user
	if(data.user){
		var paramsloss = {
			TableName:"scoring",
			Key: {"username" : data.user},
			UpdateExpression: "ADD losses :increment",
			ExpressionAttributeValues =
			{
				":increment": 1
			},
			ReturnValues:"UPDATED_NEW"
		};
		docClient.update(paramsloss, function(err, data) {
			if(err) {
				console.log("Unable to update losses. Error JSON:", JSON.stringify(err, null, 2));
			}
			else {
				console.log("Update losses succeeded:", JSON.stringify(data, null, 2));
			}
		});
		var paramswin;
		if(data.user === matches[data.lang][data.roomID].p1ID){
			paramswin = {
				TableName:"scoring",
				Key: {"username" : matches[data.lang][data.roomID].p2ID},
				UpdateExpression: "ADD wins :increment",
				ExpressionAttributeValues =
				{
					":increment": 1
				},
				ReturnValues:"UPDATED_NEW"
			};
		}
		else {
			paramswin = {
				TableName:"scoring",
				Key: {"username" : matches[data.lang][data.roomID].p1ID},
				UpdateExpression: "ADD wins :increment",
				ExpressionAttributeValues =
				{
					":increment": 1
				},
				ReturnValues:"UPDATED_NEW"
			};
		}
		docClient.update(paramswin, function(err, data) {
			if(err) {
				console.log("Unable to update losses. Error JSON:", JSON.stringify(err, null, 2));
			}
			else {
				console.log("Update losses succeeded:", JSON.stringify(data, null, 2));
			}
		});
	}
	else {
		//normal game end
	}*/
}

function playerReady(data){
	matches[data.lang][data.roomID].readyPlayers++;
	console.log("A client is ready");
	if(matches[data.lang][data.roomID].readyPlayers == 2){
		//emit game start event	
		console.log("both clients are ready");
		matches[data.lang][data.roomID].time(data.roomID);
	}
}

//stores references to all of the game objects and matches going on
//to add new language put lang: [] when running new version of app
var matches = {
  java: [],
  c_cpp: [],
  python: []
};

var problems = ["fibonacci", "helloworld", "reversestring", "wordcount"];

function GameInfo(pid, pBoxid, pSockID){
        this.p1Score = 0;
        this.p2Score = 0;
	this.p1SocketID = pSockID;
	this.p2SocketID = "";
        this.p1ID = pid;
        this.p2ID = "";
        this.p1BoxID = pBoxid;
        this.p2BoxID = 100000;
        this.timeRemaining = 1000 * 180;
        
	
        this.numPlayers = 1;
	this.readyPlayers = 0;
	
	this.problemShuffle = function(){
		var arr = problems.slice(0);
		var len = problems.length;
		var j = 0;
		var temp = "";
		for(var i = len - 1; i > 0; i--){
			j = Math.floor((Math.random() * (i-1)));
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}
	this.problemSet = this.problemShuffle();
	this.time = function(rid){
		var roomID = rid;
		var timer = setInterval(()=>{this.timeRemaining -= 1000;
			console.log(this.timeRemaining);
			io.sockets.in(roomID).emit('timerUpdate', {time:this.timeRemaining, score1:this.p1Score, score2:this.p2Score});
			if(this.timeRemaining <= 0){
				clearInterval(timer);
			}},1000);
		
	}
}
