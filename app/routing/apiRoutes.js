var friends = require("../data/friends");

module.exports = function(app) {
    //converts this directory to readable JSON format
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    //posts the user data, and the friend matched after the score difference has been calculated
    app.post("/api/friends", function(req, res) {
        var friendMatched = {
            name: "",
            photo: "",
            friendDiff: Infinity
        };

        var userData = req.body;
        var userScore = userData.scores;

        var userFriendDiff;

        for(var i=0;i<friends.length;i++) {
            var currentFriend = friends[i];
            userFriendDiff = 0;

            console.log(currentFriend.name);

            for(var j=0;j<currentFriend.scores.length;j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScore[j];

                userFriendDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
                console.log(userFriendDiff);
            }

            if(userFriendDiff <= friendMatched.friendDiff) {
                friendMatched.name = currentFriend.name;
                friendMatched.photo = currentFriend.photo;
                friendMatched.friendDiff = userFriendDiff;
            }
        }

        friends.push(userData);
        res.json(friendMatched);
    });
};
