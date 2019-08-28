# Homework 11: Friend Finder with Express.js
This is Taylor Johnson's Homework 11 - Friend Finder for the Georgia Tech Coding Boot Camp. Friend Finder is a web based application which allows a participant to complete a survey of ten questions and then be matched with a friend via a simple matching algorithm. The participant submits the answers to the ten questions on a scale of 1 to 5. The questions are statements about that ask the participant to think introspectively. 1 indicates that the participant strongly disagrees with the statement. 5 indicates that that he or she strongly agrees with the statement. 

The matching algorithm is straight forward. When the participant submits the survey, his or her scores are compared to an array of potential friends in a Javascript file. The Friends API which is invoked iterates through all potential friends, as well as each question's score for the potential friends. The participant's score for each question is subtracted from each potential friend's score for the same question. The absolute value of the differences for each question is stored.

After the differences for all ten questions have been computed, they are summed together to result in a single friend match factor. A lower number indicates a better match. The best possible friend match factor is zero -- where the survey participant and potential friend match have the same scores for all questions. The worst possible friend match factor is 40 -- where the survey participant and potential friend answered each question in exact oppositive of each other (1 and 5 or vice versa).

As each the application iterates through each potential friend match, the best possible friend match factor is always stored. The friend match factor computed in an iteration for a potential friend is always compared to the stored best friend match factor so far. If it is better, then the best friend match factor is updated and the interations continue until all potential friends have been evaluated.

After the the iterations are executed, the best friend match is included in the Friends API POST response. This data includes the matched friend's name and profile picture URL. This data is then displayed to the survey participant in a modal within the browser. If a match is not found, then the appropriate message is displayed to the survey participant, as well. There is also data validation which ensures that the name, profile picture URL, and all survey questions are answered. If any one of these is missing, a message in the form of a modal is shown to the survey participant.

## Libraries/Packages Used
1. Vanilla JavaScript
2. Node.js
3. Express.js
4. Path.js
5. Bootstrap
6. jQuery

## Friends API Methods

### GET Friends
**Description:** retrieves all potential friend matches from the data store\
**Request Method:** GET\
**Request URI:** /api/friends

**JSON Request Model:** there are no request parameters that need to be specified in the request body

**JSON Response Model:**
```json
{
    "metadata": {
        "outcome": 200,
        "outcomeMesasge": "Success - Possible New Friends Retrieved"
    },
    "newFriends":
    [
        {
            "name": "Road Runner",
            "image": "https://i.ebayimg.com/images/g/dSQAAOSwP8db72eA/s-l300.jpg",
            "scores": [
                1,
                2,
                3,
                4,
                5,
                5,
                4,
                3,
                2,
                1
            ]
        }
    ]
}
```

**Metadata/Outcome:** HTTP outcome code\
**Metadata/Outcome Message:** outcome description\
**NewFriends/Name:** potential friend's name\
**NewFriends/Image:** potential friend's profile picture URL\
**NewFriends/Scores:** array of scores/answers from the potential friend's survey -- they maintain the same order as the questions in the survey\

### POST Friends
**Description:** posts the survey participant's name, profile picture URL, and answers to all ten questions; receives a friend match in the response\
**Request Method:** POST\
**Request URI:** /api/friends\

**JSON Request Model:**
```json
{
    "name": "Papa Bear",
    "image": "https://www.yourwdwstore.net/assets/images/pins/2010pins/09sept/400000479019.jpg",
    "scores": [
        5,
        4,
        5,
        1,
        3,
        2,
        1,
        1,
        1,
        1
    ]
}
```

**Name:** survey participant's name\
**Image:** survey participant's profile picture URL\
**Scores:** answers to each survey question in an arry of integers -- they maintain the same order as the questions in the survey\

**JSON Response Model:**
```json
{
    "metadata": {
        "outcome": 200,
        "outcomeMesasge": "Success - Friend Found"
    },
    "friendName": "Wile E. Coyote",
    "friendProfilePicURL": "https://vignette.wikia.nocookie.net/looneytunes/images/7/7f/Coyote.gif/revision/latest?cb=20060219181853"
}
```

**Metadata/Outcome:** HTTP outcome code\
**Metadata/Outcome Message:** outcome description\
**Friend Name:** matched friend's name\
**Friend Profile Pic URL:** matched friend's profile pic URL

