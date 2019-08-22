// Required Dependencies
var express = require("express");
var path = require("path");

// Initialize Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server so that it begins listening for requests
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// Sets the required routing for HTML pages and APIs
require("./app/routing/htmlRoutes.js")(app);
//require("./app/routing/apiRoutes.js")(app);