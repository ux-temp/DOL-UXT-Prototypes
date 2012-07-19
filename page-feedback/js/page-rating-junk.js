	// Function used to hide all rating options and mark selection
	function removeOtherRating(rating, upDown){
		var listParent = rating.parent();

		var siblingOldWidth = listParent.siblings().width();

		var changeLink = $('<a class="change-link" href="#" style="display:none">Change</a>').on('click', function(){
			undoVote(this, listParent, siblingOldWidth);
		});


		listParent.addClass('vote').animate({"padding-right": 0 }, {duration: 500, queue: false})
			.siblings().animate({ "opacity": 0, "width": 0, "padding-right": 0 }, {duration: 500, queue: false});
		rating.animate({backgroundColor: "#f6f6f6"}, {duration: 1000, queue: false})

		changeLink.appendTo(listParent).fadeIn('slow');

	}

	function undoVote(changeLink, listParent, siblingOldWidth) {
		//$(changeLink).css({"background-color":'black'});

		function removeChangeLink(changeLink){
			changeLink.remove();
		}

		function removeStyles(){
			$('#ux-page-rating ul li').removeAttr('style');
		}

		var otherSibling = listParent.siblings();

		$(changeLink).animate({"padding-right": 0 }, {duration: 500, queue: false, complete: removeChangeLink($(changeLink)) });

		listParent.removeClass('vote').animate({"padding-right": 15 }, {duration: 500, queue: false})
			.siblings().animate({ "opacity": 1, "padding-right": 15, "width": siblingOldWidth, }, 
					{duration: 500, queue: false });
	}