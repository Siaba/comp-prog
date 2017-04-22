var clientSocket;
var language;
var roomID;
var socketID;


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
});


function initSocket(){
    clientSocket = io.connect();
    
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	clientSocket.on('loadGame', loadGame);
	
	console.log("binding events");
}

function loadGame(data){
	console.log("loading game page data...");
	language = data.lang;
	roomID = data.roomID;
	socketID = data.socketID;
	$("#body_load").empty().append(data.page);
	$("#overlay_content").empty().append(data.overlay_content);
	
}

function playerJoined(){
	console.log("Player joined event");
	
}

function openOver() {
	$("#search_overlay").attr("height", "100%");
}
function closeOver() {
	$("#search_overlay").attr("height", "0");
}
function goStyle() {
	$("#ready").attr("color", "gray");
	$("#go").attr("color", "white");
	setTimeout(function(){closeOver();}, 1000);
	clientSocket.emit('clientReady', {roomID: roomID, lang: language});
}
var x = document.getElementById("number");
x.addEventListener("webkitAnimationEnd", goStyle);
