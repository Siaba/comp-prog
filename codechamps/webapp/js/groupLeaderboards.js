
function populatePlayerList() { //This will eventually populate a list of player names.
  var x = document.getElementById("playerList");
    var y = document.createElement("OPTGROUP");
    y.setAttribute("label", "SwedishCars");
    y.appendChild(x.options[0])
    x.insertBefore(y, x.options[0]);
}

function drawGraph() { //This will eventually draw a graph and compare the two players.
  var opponent = document.getElementById("selectedPlayer").value;
  var player; //Get the name of the account of the player logged in (not the opponent).
  var theDate = new Date();
  var monthNumber = theDate.getMonth();
  var yearNumber = theDate.getYear() + 1900;
  var lastYear = theDate.getYear() + 1900;
var monthArray = new Array();
monthArray[0] = "January";
monthArray[1] = "February";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";
var lastMonthVal;
var currentMonth = monthArray[theDate.getMonth()];
if (monthNumber == 0) {
  lastMonthVal = 11;
  lastYear = lastYear - 1;
}
else {
  lastMonthVal = monthNumber - 1;
}
var lastMonth = monthArray[lastMonthVal];
//var monthArray= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var myData = new Array([lastMonth + ' ' + lastYear, 2], [lastMonth + ' ' + lastYear, 1], [currentMonth + ' ' + yearNumber, 3], [currentMonth + ' ' + yearNumber, 6]);
require('plotly')("sizzlingsyntax", "6Z4OeYQdRbwCGWbzJPqv");
var yourScores = {
  x: [lastMonth + ' ' + lastYear, currentMonth + ' ' + yearNumber],
  y: [20, 14, 23],
  name: "Your Scores",
  type: "bar"
};
var friendScores = {
  x: [lastMonth + ' ' + lastYear, currentMonth + ' ' + yearNumber],
  y: [12, 18, 29],
  name: "Your Opponent's Scores",
  type: "bar"
};
var data = [yourScores, friendScores];
var layout = {barmode: "group"};
var graphOptions = {layout: layout, filename: "grouped-bar", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
  console.log(msg);
});
}