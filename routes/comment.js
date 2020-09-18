// var express				    = require("express");
// var router 					= express.Router({mergeParams: true});
// var Comment					= require("../models/comment");
// var Campground  			= require("../models/camp");
// var passport                = require("passport");

// router.get("/new", isLoggedIn, function(req, res){
// 	Campground.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log(err)
// 		}
// 		else{
// 			res.render("commentsNew.ejs", {campground: campground});
// 		}
// 	});
	
// });

// router.post("/", isLoggedIn, function(req, res){
// 	Campground.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log(err)
// 			res.redirect("/campground");
// 		}
// 		else{
// 			Comment.create(req.body.comments, function(err, comment){
// 				if(err){
// 					console.log(err)
// 				}else{
// 					campground.comments.push(comment);
// 					campground.save();
// 					res.redirect("/campground/" + campground._id);
// 				}
// 			});
// 		}
// 	});
// });


// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }	


// module.exports = router;
