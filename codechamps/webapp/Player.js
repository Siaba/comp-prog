var clientSocket;
var language;
var roomID;
var socketID;
var username;
var time;
var minsec;
var sid;

$(document).ready(function(){
	initSocket();
	bindEvents();
	$.post('/getUserName', function(data){
	   username = data.uname;
	   sid = data.sid;
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
});


function submitAce(){
	var aceinput = $('#aceinput');
	var problem = $('#pname');
	var editor = ace.edit('editor');
	aceinput.val(editor.getValue());
	clientSocket.emit('submitCode', {body: aceinput.val(), lang: language, pname: problem.text(), boxID: sid, roomID: roomID});
}

function initSocket(){
    clientSocket = io.connect();
    
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	clientSocket.on('loadGame', loadGame);
	clientSocket.on('timerUpdate', timerUpdate);
	clientSocket.on('sandboxResult', updateOnResult);
	
	console.log("binding events");
}

function loadGame(data){
	console.log("loading game page data...");
	language = data.lang;
	roomID = data.roomID;
	socketID = data.socketID;
	$("#body_load").empty().append(data.page);
	$("#p1name").empty().append(username);
	if(username === data.p1ID) {
		$("#p2name").empty().append(data.p2ID);
	}
	else { $("#p2name").empty().append(data.p1ID); }
	$("#pname").empty().append(data.pname);
	$("#overlay_content").empty().append(data.overlay_content);
	$("#number").on("webkitAnimationEnd", function(){console.log("webkitAnimationEnd");goStyle();});
}

//need pname, p1 or p2problems
function updateOnResult(data){
	$("#pname").empty().append(data.pname);
	$("#desc").empty().append(data.desc);
	var tprev = "#t" + (data.pid-1);
	var t = "#t" + data.pid;
	$(tprev).css('border-color', 'none');
	$(tprev).css('border-style', 'none');
	$(tprev).css('border-width', 'none');
	$(t).css('border-color', '#444444');
	$(t).css('border-style', 'dotted');
	$(t).css('border-width', '2px');
}

function playerJoined(){
	console.log("Player joined event");
	
}

function forfeit(){
	var quit = confirm("Are you sure you want to forfeit? This will count as a loss");
	if(quit){
		clientSocket.emit('playerLeft', {user: username, roomID: roomID, lang: language});
	}
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
	
	if(data.p1ID == username){
		$("#p1score").empty().append(data.score1);
		$("#p2score").empty().append(data.score2);
	}
	else {
		$("#p1score").empty().append(data.score2);
		$("#p2score").empty().append(data.score1);
	}

	
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
