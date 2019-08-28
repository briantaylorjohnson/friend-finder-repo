// Executes the Javascript once the document has fully loaded
$(document).ready(function()
{
    // Listener which executes the code contained within the function when the Submit button in the survey is clicked
    $("#submit-button").on("click", function(event)
    {
        // Prevents the default outcome from occuring when the Submit button is clicked
        event.preventDefault();

        // Ensures that the Result Modal is empty from previous submissions
        $("#match-result-msg").empty();
        $("#match-result-pic").empty();

        // Local Variables need for the Javascript to run
        var relativeURL = window.location.origin; // Captures the relative URL for the page so that API requests can be made
        var formEmpty = false; // Boolean indicating if the form has any empty fields

        // Personal Information Variables
        var personName = $("#formGroupNameInput").val();
        var personPicURL = $("#formGroupPicURLInput").val();
        
        // Survey Answer Variables
        var q1 = parseInt($("input[name='inlineRadioOptions1']:checked").val());
        var q2 = parseInt($("input[name='inlineRadioOptions2']:checked").val());
        var q3 = parseInt($("input[name='inlineRadioOptions3']:checked").val());
        var q4 = parseInt($("input[name='inlineRadioOptions4']:checked").val());
        var q5 = parseInt($("input[name='inlineRadioOptions5']:checked").val());
        var q6 = parseInt($("input[name='inlineRadioOptions6']:checked").val());
        var q7 = parseInt($("input[name='inlineRadioOptions7']:checked").val());
        var q8 = parseInt($("input[name='inlineRadioOptions8']:checked").val());
        var q9 = parseInt($("input[name='inlineRadioOptions9']:checked").val());
        var q10 = parseInt($("input[name='inlineRadioOptions10']:checked").val());

        // Console logs the participant's name and profile picture URL, as well as the answers to each survey question
        console.log("Name: " + personName);
        console.log("Profile Picture URL: " + personPicURL);
        console.log("Q1: " + q1);
        console.log("Q2: " + q2);
        console.log("Q3: " + q3);
        console.log("Q4: " + q4);
        console.log("Q5: " + q5);
        console.log("Q6: " + q6);
        console.log("Q7: " + q7);
        console.log("Q8: " + q8);
        console.log("Q9: " + q9);
        console.log("Q10: " + q10);

        // Combines all personal information and survey answers into a single object
        personPackage = 
        {
            "name": personName, 
            "profilePicture": personPicURL, 
            "scores":
            [
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                q9,
                q10
            ]
        }

        // Conditionals which validate that form is filled out in full by the user
        if (personPackage.name != "")
        {
            if (personPackage.profilePicture != "")
            {
                // Checks that each survey question has been answered if the name and profile pic URL have been provided
                for (i = 0; i < personPackage.scores.length; i++)
                {
                    if (isNaN(personPackage.scores[i]) == true)
                    {
                        console.log("Error: A question is empty in form!");
                        formEmpty = true;
                    }
                }
            }

            // Checks to see if the profile pic URL text entry box is incomplete
            else
            {
                console.log("Error: Profile pic URL is empty in form!");
                formEmpty = true;
            }
        }

        // Checks to see if the name text entry box is incomplete
        else if (personPackage.name == "")
        {
            console.log("Error: Name is empty in form!");
            formEmpty = true;
        }

        // Console logs the personPackage object for debugging purposes
        console.log(personPackage);

        // Invokes the Friends API POST method to execute the friend match logic
        $.post(relativeURL + "/api/friends", personPackage, function(data)
        {
            // Console logs the response from the Friends API POST method for debugging purposes
            console.log(data);
            
            // Conditional which uses the formEmpty variable to output the correct message if the form is incomplete
            if (formEmpty == true)
            {
                var matchProfilePicImgTag = $("<img>");
                matchProfilePicImgTag.attr(
                {
                    "src": "https://media.giphy.com/media/m7BTtLWhjkEJa/giphy.gif", 
                    "alt": "Incomplete Form Pic!",
                    "class": "text-center img-fluid",
                    "style": "max-width: 100%; height: auto;"
                });

                $("#match-result-msg").append("Whoopsie! Looks like you didn't complete the survey fully. Answer all the questions and then submit it again.");
                $("#match-result-pic").append(matchProfilePicImgTag);
                $("#match-result").modal(); 
            }

            // Conditional which checks to see if the matched friend's name in the Friends API POST method reponse is empty
            // This indicates that no match was found and will output the correct mesage to the participant
            else if(data[0].friendName != "")
            {
                var matchProfilePicImgTag = $("<img>");
                matchProfilePicImgTag.attr(
                {
                    "src": data[0].friendProfilePicURL, 
                    "alt": "Match Profile Pic",
                    "class": "text-center img-fluid",
                    "style": "max-width: 100%; height: auto;"
                });

                $("#match-result-msg").append("Congratulations! You have a friend match. <br />Time to meet " + data[0].friendName + "!");
                $("#match-result-pic").append(matchProfilePicImgTag);
                $(".form-check-input").prop("checked", false);
                $("#match-result").modal(); 
            }

            // Conditional which runs if the form was submitted completely and a friend match was found
            else
            {
                var matchProfilePicImgTag = $("<img>");
                matchProfilePicImgTag.attr(
                {
                    "src": "https://media.giphy.com/media/m7BTtLWhjkEJa/giphy.gif", 
                    "alt": "Oops Profile Pic!",
                    "class": "text-center img-fluid",
                    "style": "max-width: 100%; height: auto;"
                });

                $("#match-result-msg").append("Unfortunately, we were unable to match you with a friend. <br />Please try again another time!");
                $("#match-result-pic").append(matchProfilePicImgTag);
                $("#match-result").modal(); 
            }
        });
    });
});