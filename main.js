// Setting up dependencies

// Setting up Express

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================

var reservations = [];
var waitList = [],

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all characters
app.get("/view", function(req, res) {
  res.json(reservations);
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var rewReservation = req.body;
  // Using a RegEx Pattern to remove spaces from rewReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  rewReservation.routeName = rewReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(rewReservation);

  for (var i = 0; i < reservations.length; i++) {
    if (reservations >= 5) {
        waitList.push(newReservation)
    }
    else {
        reservations.push(rewReservation);
    }
  res.json(rewReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});