$(document).ready(function()
{

    $("#submit-button").on("click", function(event)
    {
        $("#match-result-msg").empty();
        $("#match-result-pic").empty();

        event.preventDefault();

        // Local Variables
        var relativeURL = window.location.origin;
        var formEmpty = false;

        // Personal Information
        var personName = $("#formGroupNameInput").val();
        var personPicURL = $("#formGroupPicURLInput").val();
        
        // Survey Answers
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

        // Console log for survey data
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
                for (i = 0; i < personPackage.scores.length; i++)
                {
                    if (isNaN(personPackage.scores[i]) == true)
                    {
                        console.log("Error: A question is empty in form!");
                        formEmpty = true;
                    }
                }
            }

            else
            {
                console.log("Error: Profile pic URL is empty in form!");
                formEmpty = true;
            }
        }

        else if (personPackage.name == "")
        {
            console.log("Error: Name is empty in form!");
            formEmpty = true;
        }

        // Console log for personPackage object
        console.log(personPackage);
        
        console.log(relativeURL);

        $.post(relativeURL + "/api/friends", personPackage, function(data)
        {
            console.log(data);
            
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