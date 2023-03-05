//Airline Program

//import the required packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nunjucks = require('nunjucks');

var app = express();

//Configure the various dependencies
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static('public' ));

//Array for flight schedule
var schedule = [
{flight: 1212, origin: "SDF 7:00am", destination: "MIA 9:50am"},
{flight: 4505, origin: "SDF 7:20am", destination: "LAS 8:30am"},
{flight: 2212, origin: "SDF 10:00am", destination: "MIA 12:50pm"},
{flight: 5505, origin: "SDF 11:20am", destination: "LAS 12:30pm"}
];

//Create the routes for each page of the website
//Route for welcome page
app.get('/', function(req, res) {  
	
    res.render('welcome', {page_title: "welcome page", schedule: schedule});
	
	
});

//Route For Flight Reservation Page
app.get('/flights', function(req, res) {            // send user the order form
   res.render('reservations', {page_title: 'Flight Reservation Details', schedule: schedule});   
});

//Route For Detailed Summary page
app.post('/summary', function(req, res) {
	
	var fullname = req.body.fullname;
	var flightNumber = req.body.flightNumber;
	var foodPreference = req.body.foodPreference;
	var seatingPreference = req.body.seatingPreference;
	
	data = {title: 'summary',
            fullname: fullname,
            flightNumber: flightNumber,
            foodPreference: foodPreference,
            seatingPreference: seatingPreference};

    res.render('summary', data);
});	
	

	
	
app.use(function (req, res) {
  res.status(404).send("Sorry, no such page!");
});

app.listen(3000,  function () {
   console.log('Airline App started on http://localhost:3000, press Ctrl-C to terminate.' );
});
