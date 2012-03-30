(function($){
	
	// Create the plugin
	$.fn.popover = function() {
		
		var container = $('<div class="popover" style="display:none;"></div>');
		var arrow = $('<div class="arrow"></div>');

		// Loop through all passed elements in the selector array.
		return this.each(function(i){

			// Disable default click events
			var el = $(this);

			// Check to see if the popover data is under it.
			if (el.next('.ux-popover-container').length) {

				// Copy the basic structure
				var newPopover = container.clone().attr('id','popover-' + i).html( el.next('.ux-popover-container').html()).prepend(arrow.clone().addClass('top')).appendTo('body');

				//Current method can not be used until header is cleaned up
				//var newPopover = el.next('.ux-popover-container').attr('id','popover-' + i).addClass('popover').prepend(arrow.clone().addClass('top'));

				var position = el.offset(), top, left;
				
				if ((el.parent('div.arrow-down').length)) {
					var position = el.parent('div.arrow-down').offset();
					top = position.top + el.parent('div.arrow-down').height();
					left = position.left - (newPopover.outerWidth()/2) + (el.parent('div.arrow-down').width()/2);
				} else {
					top = position.top + el.height();
					left = position.left - (newPopover.outerWidth()/2) + (el.width()/2);
				}

				// Position popover
				newPopover.css({
					top: top,
					left: left
				});

				// Setup click event to bind the items to click/touch
				el.on("click",function(e){

					e.preventDefault();

					// Check to see if the current linked click is active
					if ($('#popover-'+i).hasClass('active')) {

						// The current item is active, close it.
						$('#popover-'+i).removeClass('active').hide();
					} else {
						
						// Check to see if anther popover is showing
						$('.popover.active').removeClass('active').hide();

						// Activate the new popover
						$('#popover-'+i).addClass('active').show();
					}

					// Stop the clicks from going down further layers
					e.stopPropagation();

					// Bind the html to have a new click even just incase the user clicks somewhere else.
					$('html').on("click", function() {
						$('.popover.active').removeClass('active').hide();
					});	

				});

			}
			
		});

	}

})( jQuery );