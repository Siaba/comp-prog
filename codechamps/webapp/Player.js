var clientSocket;

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
	   clientSocket.emit('findMatch', {lang: lang.val(), sid: sid.val(), uname: uname.val()}); 
    });
});


function initSocket(){
    clientSocket = io.connect();
    
}

function bindEvents(){
	clientSocket.on('playerJoined', playerJoined);
	
	console.log("binding events");
}

function playerJoined(){
	console.log("Player joined event");
	
}
