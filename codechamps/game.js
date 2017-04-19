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
    

function addMatch(lang, roomID, player1ID, player1BoxID){
        console.log('Room id: ' + roomID + ', lang: ' + lang + 'playerID ' + player1ID );
        matches[lang][roomID] = new GameInfo(player1ID, player1BoxID);
        //this.join(roomID);
        //console.log("game info: " + matches[lang][roomID].p1ID + " " + matches[lang][roomID].p1BoxID);
        //emit an event to the client that created the match so their browser can update screen
}

function joinMatch(lang, roomID, player2ID, player2BoxID){
        matches[lang][roomID].p2ID = player2ID;
        matches[lang][roomID].p2BoxID = player2BoxID;
        matches[lang][roomID].numPlayers++;
        //this.join(roomID);
        //emit join event to client
}

function findMatch(data){
        for(var key in matches[data.lang]){
                if(matches[data.lang][key].numPlayers < 2){
                        //this is where you join a game instead of create one
                        joinMatch(data.lang,key,data.uname,data.sid);
                        this.join(key);
                        console.log(data.uname, " (box: ", data.sid, ") joined ", data.lang, " ", key);
                        return;
                }
        }
        var roomID = ( Math.random() * 100000 ) | 0;
        addMatch(data.lang, roomID, data.uname, data.sid);
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

//stores references to all of the game objects and matches going on
//to add new language put lang: [] when running new version of app
var matches = {
  java: [],
  c_cpp: [],
  python: []
};



function GameInfo(pid, pBoxid){
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1ID = pid;
        this.p2ID = "";
        this.p1BoxID = pBoxid;
        this.p2BoxID = 100000;
        this.timeRemaining = 3000 * 60;
        this.problemSet = [];
        this.numPlayers = 1;
}
