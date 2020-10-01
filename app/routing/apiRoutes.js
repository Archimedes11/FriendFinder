// require("../../server.js");

var express = require("express");
var path = require("path");
var app = express();
var obj = require("../data/friends.js");

var friends = obj.friends;
//console.log(friends);
module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var user = req.body;
    var bestFriendIndex = 0;
    var minimumDifference = 1000;
    // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
    //  whatever the difference is, add to the total difference
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }
      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      if (totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }
    // send back to browser the best friend match
    friends.push(user);
    // after finding match, add user to friend array
    console.log(friends[bestFriendIndex]);
    res.json(friends[bestFriendIndex]);
  });
};

module.exports.friends = friends;