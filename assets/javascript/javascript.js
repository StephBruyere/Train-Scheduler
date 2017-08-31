

  var config = {
    apiKey: "AIzaSyDgZhchdsc_OBL3bQ2wrX0nqPVLUiS3OHs",
    authDomain: "train-game-44ff4.firebaseapp.com",
    databaseURL: "https://train-game-44ff4.firebaseio.com",
    projectId: "train-game-44ff4",
    storageBucket: "",
    messagingSenderId: "521288056126"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
 
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

database.ref().push(newTrain);
 
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});


//Time Code Block
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var trainFrequency = childSnapshot.val().frequency;

var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
var currentTime = moment()
var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');

var remainder = diffTime % trainFrequency;
var minutesAway = trainFrequency - remainder;
var trainTime = moment().add(minutesAway, "minutes");
var nextArrival = moment(trainTime).format("hh:mm");
  
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainFrequency + " minutes" + "</td><td>" + nextArrival + "</td><td>"  + minutesAway + "</td></tr>");
});

$("#remove-btn").on("click", function(event) {
	event.preventDefault();  
	$("tbody tr:last-child").remove();
	database.child(projectId.getKey()).removeValue();
});

document.getElementById('submit-btn').onsubmit= function(e){
     e.preventDefault();
}