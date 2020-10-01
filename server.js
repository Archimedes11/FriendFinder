var express = require("express");
var path = require("path");
var routes = require("./app/routing/htmlRoutes.js");
var obj = require("./app/routing/apiRoutes.js");

var friends = obj.friends;

//console.log("this");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});