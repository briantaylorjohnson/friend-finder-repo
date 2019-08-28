// Dependencies
var newFriends = require("../data/friends.js");

// This exports the APIs methods -- GET and POST

module.exports = function(app)
{
    // Route for the Friends API GET method which will retrieve all potential new friends from the friends.js data
    app.get("/api/friends", function(req, res)
    {  
        // Returns the data in the JSON format
        res.json(newFriends);
    });

    // Route for the Friends API POST method which will take the data survey data passed in the request and execute the friend match algorithm
    // Based upon the outcome of the friend matching algorithm, it will return the matched friend's name and profile pic URL
    app.post("/api/friends", function(req, res)
    {
        // Local variables needed for friend match algorithm
        var baselineMatchFactor = 40; // Starting baseline match factor -- this is the highest number that two friends can have if they don't match: (5-1)*10
        var newFriendName = ""; // Matched friend's name
        var newFriendProfilePicURL = ""; // Matched friend's profile pic URL
        
        // For loop which iterates through all of the potential friends in the friends.js looking for the best match
        for (i = 0; i < newFriends.length; i++)
        {
            // Local variables needed in the For loop of the friend match algorithm
            var comparativeMatchFactor = 40; // This is the calculated match factor based upon the two friends answers to the survey
            var friendMatchTestArray = []; // This stores all the score differences for the survey participant and each potential friend match so they can be reduced to one number 

            // For loop which iterates through each of the scores for a potential friend match
            for (j = 0; j < newFriends[i].scores.length; j++)
            {                
                // Calculates the difference between the survey participant's score and the potential friend's score for each question  
                scoreDiff = Math.abs(parseInt(req.body.scores[j] - parseInt(newFriends[i].scores[j])));
                
                // Pushes the difference between the survey participant's score and the potential friend's score for each question to an array
                friendMatchTestArray.push(scoreDiff);
            }
            
            // This reduces all the differences between the scores of the survey participant and potential friend to one number by summing the numbers in the friendMatchTestArray()
            comparativeMatchFactor = friendMatchTestArray.reduce(function(acc, val) { return acc + val; }, 0);

            // This outputs the results of the friend match algorithm: Potential Friend's name, the baseline factor the match is being compared against, and the match factor for the participant and potential friend 
            console.log("Potential Friend: " + newFriends[i].name);
            console.log("Baseline Match Factor: " + baselineMatchFactor);
            console.log("Comparative Match Factor: " + comparativeMatchFactor + "\n");

            // If the comparative match factor (the sum of the differences of the two friends' scores) is lower than the baseline match factor, then the current potential friend is the best match so far
            // The For loop will iterate through all of the potential friends, but the newFriendName and newFriendProfilePicURL will only update if the current potential friend is a better match than prior potential friends
            if (comparativeMatchFactor < baselineMatchFactor)
            {
                    // Sets the new baseline match factor to the current comparative match factor since the current match is better than previous matches
                    baselineMatchFactor = comparativeMatchFactor; 

                    // Sets the new friend name and new friend profile pic URL since the current match is better than previous matches
                    newFriendName = newFriends[i].name;
                    newFriendProfilePicURL = newFriends[i].image;
            }
        }

        // Conditional which checks if the variable newFriendName is an empty string from the matching algorithm
        // If it is not empty, then a friend match was made; the outcome message in the Friends API response indicates this
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

        // Else conditional which passes when the variable newFriendName is empty
        // If it is empty, then a friend match was not made; the outcome message in the Friends API response indicates this
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
