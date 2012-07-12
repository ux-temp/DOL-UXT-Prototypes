$(document).ready(function(){

	// Function used to hide all rating options and mark selection
	function removeOtherRating(rating, upDown){
		var listParent = rating.parent();

		// Add undo click to selected rating int the variable to be read
		var undo = $('<a></a>').attr('href','#').addClass('change-rating').text('Change').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			restorOtherRating(upDown);

		});	

		listParent.addClass('vote').siblings().slideUp().animate({ opacity: 0 }, {duration: 500, queue: false});
		undo.appendTo(rating);

		if (upDown) {

			$('#written-feedback').slideDown().animate({ opacity: 1 }, {duration: 500, queue: false});

			var scroll = window.pageYOffset + 175;

			// Scroll down to the location, but dont change the X axis
			window.scroll(window.pageXOffset, scroll);

		} else {
			thankThem(200);
		}



	}

	// Function is used to restore all rating options and deselect selection
	function restorOtherRating(written){

		// Check to see if the thank you is being show, If so hide it
		if ( $('#page-rating-thank-you').is(':visible') ) {
			$('#page-rating-thank-you').hide();
		}

		var changeLinks = $('.change-rating');
		var currentSelection = changeLinks.parents('li.vote');

		currentSelection.removeClass('vote').siblings().slideDown().animate({ opacity: 1 }, {duration: 500, queue: false});

		if (written) {

			$('#written-feedback').slideUp().animate({ opacity: 0 }, {duration: 500, queue: false});
		}


		changeLinks.remove();

	}

	// Shows the thank you message for giving feedback
	function thankThem(delay) {
		$('#page-rating-thank-you').delay(delay).fadeIn(600, function(){
			$(this).delay(2500).fadeOut(600);
		});
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

	feedback.on('click', function(){

		$('#written-feedback').slideUp().animate({ opacity: 0 }, {duration: 500, queue: false, complete: thankThem(350)});

	});

});