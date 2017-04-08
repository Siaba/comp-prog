var clientSocket;

$(document).ready(function(){
    initSocket();
    bindEvents();
});


function initSocket(){
    clientSocket = io.connect();
    clientSocket.on('connect', function(){
	    clientSocket.emit('join_room', "Joining room ");
	});
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	
}

function playerJoined(){
	clientSocket.emit('hello', "Hi i am a socket");	
}
