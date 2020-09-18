var express 				= require("express");
var app 					= express({mergeParams: true});
var bodyParser  			= require("body-parser");
var mongoose 				= require("mongoose");
var flash					= require("connect-flash");
var methodOverride			= require("method-override");
var Comment					= require("./models/comment");
var Campground  			= require("./models/camp");
var seedDb      			= require("./seeds");
var User					= require("./models/user");
var passport    			= require("passport");
var passportLocal 			= require("passport-local");
var expressSession			= require("express-session");
var passportLocalMongoose 	= require("passport-local-mongoose");

// var encryptionRouter 		= require("./routes/encryption");
// var campgroundRouter        = require("./routes/campground");
// var commentRouter           = require("./routes/comment");
// seedDb();

mongoose.connect("mongodb://localhost/yelp_camps",{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb+srv://abhishek-yelp:<123456a789>@cluster0.xdktw.mongodb.net/<Cluster0>?retryWrites=true&w=majority",{useNewUrlParser: true});



app.use(bodyParser.urlencoded({extended: true , useUnifiedTopology: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(flash());
app.locals.moment = require("moment");


app.use(expressSession({
	secret: "Harry Potter is my favourite movie",
	resave: false,
	saveUninitialized: false
}));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success 	   = req.flash("success"); 
	next();
});



app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use("/", encryptionRouter);
// app.use("/campground", campgroundRouter);
// app.use("/campground/:id/comments", commentRouter);


app.get("/", function(req, res){
	// res.send("At YelpCamp Home Page.....");
	res.render("home.ejs");
});

app.get("/campground", function(req,res){
	
	Campground.find({}, function(err, findCampground){
		if(err){
			console.log("Something gone went wrong");
			console.log(err);
		}
		else{
			res.render("camp.ejs", {campground: findCampground});
		}
	});
});


app.post("/campground", isLoggedIn,function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCamp = {name: name , price: price,  image: image, description: description, author: author};
	Campground.create(newCamp, function(err, findCampgrounds){
		if(err){
			console.log("error");
			req.flash("error", "You will need to be logged in first ");
		}
		else{
			req.flash("success", " Successfully campground created ")

			res.redirect("/campground");
			// console.log(newCamp);
		}
		
	});
});

app.get("/campground/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campground/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, Campgroundfound){
		if(err){
			console.log("error");
		}
		else{
			
			res.render("show.ejs", {campground: Campgroundfound});
		}
	});
	
});

app.get("/campground/:id/edit",checkPermission,  function(req, res){
		Campground.findById(req.params.id, function(err, campground){
			res.render("edit.ejs",{campground: campground});
			

		});
	
});

app.put("/campground/:id",checkPermission,  function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campgroundFounds){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}else{
			req.flash("success", " Successfully campground updated ")
			res.redirect("/campground/" + req.params.id);
		}
	});
});

app.delete("/campground/:id", checkPermission, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			
		}else{
			req.flash("success", " Successfully  deleted ")
			res.redirect("/campground");
		}
	});
});


app.get("/campground/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}
		else{
			res.render("commentsNew.ejs", {campground: campground});
		}
	});
	
});

app.post("/campground/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
			res.redirect("/campground");
		}
		else{
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err)
				}else{
					comment.author.username = req.user.username;
					comment.author.id       = req.user._id;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					
					res.redirect("/campground/" + campground._id);
				}
			});
		}
	});
});


app.get("/campground/:id/comments/:comments_id/edit", checkCommentPermission,  function(req, res){
	Comment.findById(req.params.comments_id, function(err, editComment){
		if(err){
			req.flash("error", " You will not have a permission to do that ")
			res.redirect("back");
		}
		else{
			res.render("commentEdit.ejs", {campground_id: req.params.id, comment: editComment});
		}
	});
	
});

app.put("/campground/:id/comments/:comments_id",checkCommentPermission,  function(req, res){
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comments, function(err, updateComment){
		if(err){
			req.flash("error", " You will not have a permission to do that ")
			res.redirect("back");
		}
		else{
			req.flash("success", " Successfully comments updated ")
			res.redirect("/campground/" + req.params.id);
		}
	});
});


app.delete("/campground/:id/comments/:comments_id", checkCommentPermission, function(req, res){
	Comment.findByIdAndRemove(req.params.comments_id, function(err){
		if(err){
			req.flash("error", " You will not have a permission to do that ")
			res.redirect("back");
		}
		else{
			req.flash("success", " Successfully comments deleted ")
			res.redirect("/campground/" + req.params.id);
		}
	});
})

app.get("/register", function(req, res){
	res.render("register.ejs");
});

app.post("/register", function(req, res){
	var newUser = ({username: req.body.username});
	// if(req.body.adminCode === "encrypted@#"){
	// 	newUser.isAdmin = true;
	// 	console.log(newUser);
	// }
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to the yelpcamp " + user.username);
			res.redirect("/campground");
		});
	});
});


app.get("/login", function(req, res){
	res.render("login.ejs");
});

app.post("/login", passport.authenticate("local",{
	successRedirect: "/campground",
	failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
	
	req.logout();
	req.flash("success", "You logged out...");
	res.redirect("/campground");
})
		
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
		
	}
	req.flash("error", "You will need to be logged in first ");
	res.redirect("/login");
}	



function checkPermission(req, res,  next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, campground){
			if(err){		
				console.log(err);
				res.redirect("/campground");
			}else{
				if(campground.author.id.equals(req.user._id)){
					
					next();					
				}
				else{
					req.flash("error", " You will not have a permission to do that ")
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "You will need to be logged in first ");
		res.redirect("back");
	}
}

function checkCommentPermission(req, res,  next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comments_id, function(err, Commentfind){
			if(err){		
				console.log(err);
				res.redirect("/campground");
			}else{
				if(Commentfind.author.id.equals(req.user._id)){
					
					next();					
				}
				else{
					req.flash("error", " You will not have a permission to do that ")
					res.redirect("back");
				}
			}
		});
	}
	else{
		req.flash("error", "You will need to be logged in first ");
		res.redirect("back");
	}
}



app.listen(process.env.PORT||5000,process.env.IP, function(){
	console.log("Server has Started.............");
});