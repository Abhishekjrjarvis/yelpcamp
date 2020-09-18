// var express = require("express");
// var router = express.Router();
// var Campground = require("../models/camp");

// router.get("/", function(req,res){
	
// 	Campground.find({}, function(err, findCampground){
// 		if(err){
// 			console.log("Something gone went wrong");
// 			console.log(err);
// 		}
// 		else{
// 			res.render("camp.ejs", {campground: findCampground});
// 		}
// 	});
// });


// router.post("/", function(req, res){
// 	var name = req.body.name;
// 	var image = req.body.image;
// 	var description = req.body.description;
// 	var newCamp = {name: name , image: image, description: description};
// 	Campground.create(newCamp, function(err, findCampgrounds){
// 		if(err){
// 			console.log("error");
// 		}
// 		else{
// 			res.redirect("/campground");
// 			// console.log(newCamp);
// 		}
		
// 	});
// });

// router.get("/new", function(req, res){
// 	res.render("new.ejs");
// });

// router.get("/:id", function(req, res){
// 	Campground.findById(req.params.id).populate("comments").exec(function(err, Campgroundfound){
// 		if(err){
// 			console.log("error");
// 		}
// 		else{
			
// 			res.render("show.ejs", {campground: Campgroundfound});
// 		}
// 	});
	
// });

// module.exports = router;