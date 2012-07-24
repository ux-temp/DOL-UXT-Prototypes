$(document).ready(function(){

	/*
	 * Resets the page rating back to its inital stat.
	 */

	function changeRating(changeLink, hiddenLinkWidth) {

		var cl = $(changeLink),
		activeVote = cl.siblings('.vote'),
		hiddenVote = cl.siblings('a').not('.vote'),
		written = $('#written-feedback');

		cl.fadeOut('fast').delay(250);

		activeVote.removeClass('vote');
		hiddenVote.on('click',ratingClick).animate({opacity: 1, width: hiddenLinkWidth }, {duration: 650, queue: false});
		cl.remove();

		if (written.is(':visible')) {
			written.slideUp('slow');
		}

	}

	/*
	 * Function will executed on click of a change rating link
	 */

	function addChangeRating(rating, hiddenLinkWidth, moreInfo){

		// link to allow user to change their rating
		var changeLink = $('<a id="change-link" href="#">Change</a>').on('click', function(e){
			
			e.preventDefault();

			changeRating(this, hiddenLinkWidth);
		});

		changeLink.delay(500).insertAfter(rating).fadeIn('fast', function(){
			
			if (moreInfo) {
				$('#written-feedback').slideDown();
			}

		});


	}

	/*
	 * Mark the choosen rating and expose the change option and the additional info form if need be.
	 */

	function markRating(rating) {

		// Save off the the rating type
		var negVote = rating.hasClass('downvote'),
		moreInfo = false;

		// Check to see if the needs improvement was check to flag if the additional info
		// function needs to be called
		if (negVote) {
			moreInfo = true;
		}

		rating.addClass('vote');
		otherRatingWidth = rating.siblings('a').width();
		rating.siblings('a').off('click').animate({opacity: 0, width: 0 }, {duration: 650, queue: false, complete: addChangeRating(rating, otherRatingWidth, moreInfo)})

		// Chekc to see if negitive vote was false. If so then we want to show the thank you message
		if (!negVote) {
			showThanks();
		}

	}

	/*
	 * Function to display the Thank You feedback
	 */

	 function showThanks(){
	 	$('#pr-thank-you').show().animate({opacity: 1, height: 21},{duration: 650, queue: true, complete: hideThanks});
	 }

	 function hideThanks(){
	 	$('#pr-thank-you').delay(4000).animate({opacity: 0, height: 0},{duration: 650, queue: true});
	 }


	/*
	 * Page rating fucnctions
	 */

	function ratingClick(e) {
		e.preventDefault();

		ratingLink = $(this);

		if ( !ratingLink.hasClass('vote') ) {
			markRating(ratingLink);
		}

	}

	function hideCommentShowThanks(e) {

		e.preventDefault();

		// Hide just the form and display the thank you message
		$("#written-feedback").slideUp('slow', showThanks);
	}

	/*
	 *	Written feeback functions
	 */

	function writtenSubmit() {

		// Check to see if there is even text in the box
		if ($("#written-feedback textarea").val() != "") {
			
			// Hide just the form
			hideCommentShowThanks();
		}
	}

	/*
	 * Default rating and feedback buttons that can be interacted with.
	 */

	var upvote = $('#ux-page-rating .upvote'),
	downvote = $('#ux-page-rating .downvote'),
	feedback = $('#feedBackSubmit');
	noComment = $('.no-comment');


	// Setup click events.
	upvote.on('click', ratingClick);
	downvote.on('click', ratingClick);
	feedback.on('click', writtenSubmit);
	noComment.on('click', hideCommentShowThanks);


});