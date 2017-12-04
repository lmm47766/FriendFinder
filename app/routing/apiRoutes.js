var friends = require("../data/friends.js");
var path = require("path");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post('/api/newfriend', function(req, res) {

		var newFriend = {
			"name": req.body.name,
			"photo": req.body.photo,
			"scores": req.body.scores.map(Number)
		}
		var match = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var totalDifference = 0;

		for (var i = 0; i < friends.length; i++) {
			totalDifference = 0;

			for (var j = 0; j < 10; j++) {
				totalDifference += Math.abs(parseInt(newFriend.scores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= match.matchDifference) {
					match.name = friends[i].name;
					match.photo = friends[i].photo;
					match.matchDifference = totalDifference;
				}
			}
		}

		friends.push(newFriend);
		res.json(match);

	});

}