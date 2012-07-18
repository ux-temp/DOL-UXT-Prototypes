$(document).ready(function(){

	// Function used to hide all rating options and mark selection
	function removeOtherRating(rating, upDown){
		var listParent = rating.parent();

		listParent.addClass('vote').animate({"padding-right": 0 }, {duration: 500, queue: false})
			.siblings().animate({ "opacity": 0, "width": 0, "padding-right": 0 }, {duration: 500, queue: false});
		rating.animate({backgroundColor: "#f6f6f6"}, {duration: 1000, queue: false})



	}


	var upvote = $('#ux-page-rating .upvote');
	var downvote = $('#ux-page-rating .downvote');
	var feedback = $('#feedBackSubmit');


	// Setup click events.
	upvote.on('click', function(e){

		e.preventDefault();

		if ( !$(this).parent().hasClass('vote') ) {
			removeOtherRating(upvote, false);
		}

	});

	downvote.on('click', function(e){

		e.preventDefault();

		if ( !$(this).parent().hasClass('vote') ) {
			removeOtherRating(downvote, true);
		}

	});


});