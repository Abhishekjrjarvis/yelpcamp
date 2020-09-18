// var express				    = require("express");
// var router 					= express.Router();
// var User					= require("../models/user");
// var passport    			= require("passport");


// router.get("/", function(req, res){
// 	// res.send("At YelpCamp Home Page.....");
// 	res.render("home.ejs");
// });

// router.get("/register", function(req, res){
// 	res.render("register.ejs");
// });

// router.post("/register", function(req, res){
// 	var newUser = ({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err, user){
// 		if(err){
// 			console.log(err);
// 			return res.render("/register");
// 		}
// 		passport.authenticate("local")(req, res, function(){
// 			res.redirect("/campground");
// 		});
// 	});
// });


// router.get("/login", function(req, res){
// 	res.render("login.ejs");
// });

// router.post("/login", passport.authenticate("local",{
// 	successRedirect: "/campground",
// 	failureRedirect: "/login"
// }), function(req, res){
// });

// router.get("/logout", function(req, res){
	
// 	req.logout();
// 	res.redirect("/campground");
// })
		 
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }	
// module.exports = router;