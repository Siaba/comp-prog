var fs = require('fs');
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
										 socketID: this.id
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

function submitCode(){
        
}

function newGame(){
        
}

function playerLeft(){
        
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



function GameInfo(pid, pBoxid, pSockID){
        this.p1Score = 0;
        this.p2Score = 0;
	this.p1SocketID = pSockID;
	this.p2SocketID = "";
        this.p1ID = pid;
        this.p2ID = "";
        this.p1BoxID = pBoxid;
        this.p2BoxID = 100000;
        this.timeRemaining = 1000 * 10;
        this.problemSet = [];
        this.numPlayers = 1;
	this.readyPlayers = 0;
	
	this.time = function(rid){
		var roomID = rid;
		var timer = setInterval(countDown,1000);
		function countDown(){
			this.timeRemaining -= 1000;
			console.log(this.timeRemaining);
			io.sockets.in(roomID).emit('timerUpdate');
			if(this.timeRemaining <= 0){
				clearInterval(timer);
			}
		}
	}
}
