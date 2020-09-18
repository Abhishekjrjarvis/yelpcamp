var mongoose = require("mongoose");
var Campground = require("./models/camp");
var Comment = require("./models/comment");


var data = [
	{
		name: "harry",
		image: "https://latestnews.fresherslive.com/images/articles/width-900/2020/08/08/fall-guys-game-free-download-for-andriod-5f2e1ebbab3ba-1596858043.jpg",
		description: "Best finder"
	},
	{
		name: "Herminoe",
		image: "https://latestnews.fresherslive.com/images/articles/width-900/2020/08/08/fall-guys-game-free-download-for-andriod-5f2e1ebbab3ba-1596858043.jpg",
		description: "Best at the potion class"
	}
];
		   

function seedDb(){
	Campground.remove({},  function(err){
		// if(err){
		// 	console.log(err);
		// }else{
		// 	console.log("All Campground to be removed");
		// 	data.forEach(function(seed){
		// 		Campground.create(seed, function(err, campground){
		// 			if(err){
		// 				console.log(err);
		// 			}	
		// 			else{
		// 				Comment.create({
		// 					text: "make a best friend",
		// 					author: "J.K.ROWLING"
		// 				}, function(err, comment){
		// 					if(err){
		// 						console.log(err);
		// 					}
		// 					else{
		// 						campground.comments.push(comment);
		// 						campground.save();
								
								
		// 					}
		// 				});
						
		// 			}
		// 		});
		// 	});
			
		// }
		
	});
}


module.exports = seedDb ;