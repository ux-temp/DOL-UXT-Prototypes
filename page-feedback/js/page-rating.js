$(document).ready(function(){

	function changeRating(changeLink) {

		$(changeLink).css("background-color","black");

	}


	function markRating(rating) {

		// link to allow user to change their rating
		var changeLink = $('<a id="change-link" href="#">Change</a>').on('click', function(){
			changeRating(this);
		});


		rating.addClass('vote');
		rating.siblings('a').off('click').animate({opacity: 0, width: 0 }, {duration: 500, queue: false})

		changeLink.after(rating));

	}

	function ratingClick(e) {
		e.preventDefault();

		ratingLink = $(this);

		if ( !ratingLink.hasClass('vote') ) {
			markRating(ratingLink);
		}

	}




	var upvote = $('#ux-page-rating .upvote');
	var downvote = $('#ux-page-rating .downvote');
	var feedback = $('#feedBackSubmit');


	// Setup click events.
	upvote.on('click', ratingClick);
	downvote.on('click', ratingClick);


});