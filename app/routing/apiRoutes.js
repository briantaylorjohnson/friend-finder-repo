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

        var baselineMatchFactor = 40;
        var newFriendName = "";
        var newFriendProfilePicURL = "";
        
        for (i = 0; i < newFriends.length; i++)
        {
            var comparativeMatchFactor = 40;
            var friendMatchTestArray = []; 

            for (j = 0; j < newFriends[i].scores.length; j++)
            {                
                // Calculates the difference between the survey participant's score and the potential friend's score for each question  
                scoreDiff = Math.abs(parseInt(req.body.scores[j] - parseInt(newFriends[i].scores[j])));
                
                // Pushes the difference between the survey participant's score and the potential friend's score for each question to an array
                friendMatchTestArray.push(scoreDiff);
            }
            
            comparativeMatchFactor = friendMatchTestArray.reduce(function(acc, val) { return acc + val; }, 0);

            console.log("Potential Friend: " + newFriends[i].name);
            console.log("Comparative Match Factor: " + comparativeMatchFactor);
            console.log("Baseline Match Factor: " + baselineMatchFactor + "\n");

            if (comparativeMatchFactor < baselineMatchFactor)
            {
                    baselineMatchFactor = comparativeMatchFactor; 

                    newFriendName = newFriends[i].name;
                    newFriendProfilePicURL = newFriends[i].image;
            }
        }

        if (newFriendName != "")
        {
            res.json(
            [
                {
                    "metadata":
                    {
                        "outcome": 200,
                        "outcomeMesasge": "Success - Friend Found"
                    },
                    "friendName": newFriendName,
                    "friendProfilePicURL": newFriendProfilePicURL
                }
            ]);
        }

        else
        {
            res.json(
            [
                {
                    "metadata":
                    {
                        "outcome": 200,
                        "outcomeMesasge": "Success - No Friend Found"
                    },
                    "friendName": newFriendName,
                    "friendProfilePicURL": newFriendProfilePicURL
                }
            ]);
        }

    });
};
