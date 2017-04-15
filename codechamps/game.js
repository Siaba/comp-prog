var io;

exports.initGame = function(siolib, socket){
        io = siolib;
       
        console.log("binding events"); 
        socket.on('playerJoined', playerJoined);
        socket.on('submitCode', submitCode);
        socket.on('newGame', newGame);
        socket.on('findMatch', findMatch);
        socket.on('playerLeft', playerLeft);
}
    

function addMatch(lang, roomID, player1ID){
        console.log('Room id: ' + roomID + ', lang: ' + lang);
        matches.lang[roomID] = new GameInfo(player1ID);
        
}

function findMatch(data){
        var roomID = ( Math.random() * 100000 ) | 0;
        addMatch(data.lang, roomID, this.handshake.session);
        
}

function playerJoined(){
        
}

function submitCode(){
        
}

function newGame(){
        
}

function playerLeft(){
        
}

//stores references to all of the game objects and matches going on
//to add new language put lang: [] when running new version of app
var matches = {
  java: [],
  c_cpp: [],
  python: []
};



function GameInfo(pid){
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1ID = pid;
        this.p2ID = "";
        this.timeRemaining = 3000 * 60;
        this.problemSet = [];
}
