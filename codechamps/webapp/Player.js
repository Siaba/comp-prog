var clientSocket;

$(document).ready(function(){
    initSocket();
    bindEvents();
    $.post('/getUserName', function(data){
	    $("uname").val(data.uname);
	    $("sid").val(data.sid);
	    console.log(data.uname + "" + data.sid);
    });
});


function initSocket(){
    clientSocket = io.connect();
    clientSocket.on('connect', function(){
	    clientSocket.emit('join_room', "Joining room ");
	    
	});
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	console.log("binding events");
}

function playerJoined(){
	console.log("Player joined event");
	clientSocket.emit('hello', "Hi i am a socket");	
}
