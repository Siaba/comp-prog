

$(document).ready(function(){
    initSocket();
});


function initSocket(){
    var socket = io.connect();
    socket.on('connect', function(){
	    socket.emit('join_room', "Joining room ");
	});
}
