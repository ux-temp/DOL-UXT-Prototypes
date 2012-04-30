/*
=============================================================================
	Source: Open-UX popovers script
	Changes:
		- Added additonal logic to work with the fixed/fluid grid system.
=============================================================================
*/

(function($){
	

	// Attach the new plugin onto the jQuery object.
	$.fn.extend({

		popover: function() {


            // Loop through and setup all the inital links.
			return this.each(function(e) {

				// Save off the link.
				var link = $(this);

				// Popover container
				var popover = link.next('div:first');

				// Add the arrow div if needed
				if (!popover.children('div.arrow').length) {
					popover.prepend($('<div>').addClass('arrow'));
				}

				// Setup the link click event
				link.on('click', function(e) {

					// Disable defualt link action
					e.preventDefault();

					// Get the sibling div that relates to this popover item.
					var link = $(this);
					var popover = link.next('div:first');
					var arrow = popover.children('div.arrow');

					// First lets makse sure that if the current link is click twice we only close
					// the current popovers
					if (popover.css('display') == 'block') {

						popover.removeClass('ux-po-active').hide()
						return;

					} else {

						// Check to see if any other popovers exist first and close them.
						$('.ux-po-active').removeClass('ux-po-active').hide();

						// lets move the popover to the right location
						var linkPos = link.offset(), top, left;

						// Popover location
						top = linkPos.top + link.height();
						//left = linkPos.left - (obj.outerWidth()/2) + (link.width()/2;
						left = linkPos.left - (popover.outerWidth()/2) + (link.width()/2) + 10;

						if ($('body').is('fluid')) {

							alert('yes');
							
							// Check to make sure if the the left if off the screen if so balance it.
							if (left <= 0) {

								// 5 reflects half the width of the arrow.
								//var aLeft = (left * -1) + 5;
								var aLeft = popover.outerWidth()/2 - link.width()/2

								// Apply new styles
								arrow.css({left:aLeft});

								// Set left to be 10px away from the side of the window.
								left = 10; 

							}

							// Check to see if the popover flows over the right side of the screen
							if ((left+popover.outerWidth()) > $(window).width()){

								// 5 reflects half the width of the arrow.
								var aLeft = link.width()/2 + popover.outerWidth()/2;

								// Apply new styles
								arrow.css({left:aLeft});
								
								// Set left to be 10px away from the side of the window.
								left = $(window).width() - popover.outerWidth() - 10;

							}
						}

						// Stop the click event from going an fearther then the calling element
						e.stopPropagation();

						// Set the body click event so if any other section of the screen is clicked
						// to close any open popover.
						$('html').on("click", function() {
							$('.ux-po-active').removeClass('ux-po-active').hide();
							$('html').unbind('click');
						});	


						// Set location on the popover container and show
						popover.css({top:top,left:left}).addClass('ux-po-active').show();

					}


				});

			});

		}

	});

})( jQuery );