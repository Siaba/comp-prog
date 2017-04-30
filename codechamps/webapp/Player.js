var clientSocket;
var language;
var roomID;
var socketID;
var time;
var minsec;

$(document).ready(function(){
	initSocket();
	bindEvents();
	$.post('/getUserName', function(data){
	   $("#uname").val(data.uname);
	   $("#sid").val(data.sid);
	   console.log(data.uname + "" + data.sid);
	});
	$("#findmatchform").submit(function(e){
		e.preventDefault();
		var sid = $('#sid');
		var uname = $('#uname');
		var lang = $('#language');
		lang.attr('disabled',true);
		$('#fm_button').attr('disabled', true);
		openOver();
		clientSocket.emit('findMatch', {lang: lang.val(), sid: sid.val(), uname: uname.val()});
	});
	$("#aceform").submit(function(e){
		e.preventDefault();
		var aceinput = $('#aceinput');
		var problem = $('#problems');
        	var sid = $('#sid');
		var editor = ace.edit('editor');
		aceinput.val(editor.getValue());
        	clientSocket.emit('submitCode', {code: aceinput.val(), lang: language, pname: problem.val(), sid: sid.val()});
		//do we need to send socketid?
	});
});


function initSocket(){
    clientSocket = io.connect();
    
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	clientSocket.on('loadGame', loadGame);
	clientSocket.on('timerUpdate', timerUpdate);
	
	console.log("binding events");
}

function loadGame(data){
	console.log("loading game page data...");
	language = data.lang;
	roomID = data.roomID;
	socketID = data.socketID;
	$("#body_load").empty().append(data.page);
	var player1 = $("#uname").val();
	$("#p1name").empty().append(player1);
	if(player1 === data.p1ID) {
		$("#p2name").empty().append(data.p2ID);
	}
	else { $("#p1name").empty().append(data.p1ID); }
	$("#overlay_content").empty().append(data.overlay_content);
	$("#number").on("webkitAnimationEnd", function(){console.log("webkitAnimationEnd");goStyle();});
}

function playerJoined(){
	console.log("Player joined event");
	
}

function timerUpdate(data){
	console.log("The timer has updated");
	time = new Date(1000*Math.round(data.time/1000));
	var sec;
	if(time.getUTCSeconds() < 10){
		sec = "0" + time.getUTCSeconds();
	}
	else{
		sec = time.getUTCSeconds();
	}
	minsec = time.getUTCMinutes() + ":" + sec;
	$("#timer").html(minsec);
}

function openOver() {
	$("#search_overlay").css("height", "100%");
}
function closeOver() {
	$("#search_overlay").css("height", "0");
}
function goStyle() {
	console.log("goStyle called");
	$("#ready").css("color", "gray");
	$("#go").css("color", "white");
	console.log("ready & go colors changed");
	setTimeout(function(){closeOver();}, 1000);
	console.log("time elapsed: close overlay");
	clientSocket.emit('playerReady', {roomID: roomID, lang: language});
	console.log("playerReady client emit made");
}
