/*
	1. Every ejs hile has an extension .ejs
	2. NodeJS looks into a folder "views" to render a Page
	3. Tell NodeJS to use the ejs as page 

*/
// console.log("running");

var express = require("express");
var bodyParser = require("body-parser")
var app = express();

app.set('view engine', 'ejs');

app.use(express.static("css"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
	res.send("home.ejs");
});

var friendlist = ["Alice", "Clark", "Bellamy", "Octavia"];

app.get("/friends", function(req, res){
	// this sends to friends.ejs
	res.render("friends", {friends: friendlist});

});

// the form method is post so we need to call app.post
app.post("/addfriends", function(req, res){
	// console.log(req.body);
	var newFriend = req.body.newFriend;
	friendlist.push(newFriend);
	res.redirect("/friends");
});


app.get("/*", function(req, res){
	res.send("error.ejs");
});

//3000 is for localhost and 8080 is for heroku
app.listen(process.env.PORT || 3000 || 8080, function(){
	console.log("Server is running...");
});
