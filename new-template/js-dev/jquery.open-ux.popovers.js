(function($){
	

	// Attach the new plugin onto the jQuery object.
	$.fn.extend({

		popover: function() {

			return this.each(function() {
				
				// Save off the current popover container info
				var container = $(this);

				// Save of the binding link... Should be declared right above the popover container
				var link = container.prev('a');

				// Setup the click event that runs every time a popover is clicked
				link.on("click", function(e){

					// Prevent the original click action
					e.preventDefault();
					
					// Get the links current location
					var linkPos = link.offset(), top, left;

					top = linkPos.top + link.height();
					left = linkPos.left - (container.outerWidth()/2) + (link.width()/2);

					container.css({top:top,left:left}).show();

					//alert(linkPos);

				});

			});

		}

	});

})( jQuery );