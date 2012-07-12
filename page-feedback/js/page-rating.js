$(document).ready(function(){

	function removeOtherRating(rating, upDown){
		var listParent = rating.parent();

		// Add undo click to selected rating int the variable to be read
		var undo = $('<a></a>').attr('href','#').addClass('change-rating').text('Change').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			if (upDown) {

				restorOtherRating(upDown);
			} else {
				restorOtherRating(upDown);
			}

		});	

		listParent.addClass('vote').siblings().slideUp().animate({ opacity: 0 }, {duration: 500, queue: false});
		undo.appendTo(rating);

		if (upDown) {

			$('#written-feedback').slideDown().animate({ opacity: 1 }, {duration: 500, queue: false});

			var scroll = window.pageYOffset + 175;

			// Scroll down to the location, but dont change the X axis
			window.scroll(window.pageXOffset, scroll);

		} else {
			thankThem();
		}



	}

	function restorOtherRating(written){
		var changeLinks = $('.change-rating');
		var currentSelection = changeLinks.parents('li.vote');

		currentSelection.removeClass('vote').siblings().slideDown().animate({ opacity: 1 }, {duration: 500, queue: false});

		if (written) {

			$('#written-feedback').slideUp().animate({ opacity: 0 }, {duration: 500, queue: false});
		}


		changeLinks.remove();

	}

	function thankThem() {
		$('#page-rating-thank-you').fadeIn(600, function(){
			$(this).delay(650).fadeOut();
		});
	}


	var upvote = $('#ux-page-rating .upvote');
	var downvote = $('#ux-page-rating .downvote');
	var feedback = $('#feedBackSubmit');

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
		thankThem();
	});

});