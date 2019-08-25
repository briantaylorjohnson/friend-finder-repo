// Required Dependencies
var express = require("express");
var path = require("path");

// Exports the HTML routing for the home.html and survey.html pages
// The home.html page is the default when a specific page is not specified
module.exports = function(app)
{
    // Default routing to home.html when a specific page is not specified in the request path; also ensures that /home resolves to the home.html
    app.get("/", function(req, res)
    {
        res.sendFile(path.join(__dirname, "../public/home.html"));    
    });

    app.get("/home", function(req, res)
    {
        res.sendFile(path.join(__dirname, "../public/home.html"));    
    });

    // Routing to the survey page when survey is specified in the request path
    app.get("/survey", function(req, res)
    {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/survey.js", function(req, res)
    {
        res.sendFile(path.join(__dirname, "../public/survey.js"));
    });
}