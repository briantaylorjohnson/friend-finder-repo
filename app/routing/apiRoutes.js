// Dependencies
var newFriends = require("../data/friends.js");

// This exports the APIs methods -- GET and POST

module.exports = function(app)
{
    // GET method which will retrieve the potential new friends from the friends.js in JSON format
    app.get("/api/friends", function(req, res)
    {
        res.json(newFriends);
    });

    app.post("/api/friends", function(req, res)
    {
        var name = req.body.name;

        res.json(
            [
                {
                    "outcome": 200,
                    "outcomeMesasge": "Success",
                    "name": name
                }
            ]
        )
    });
};
