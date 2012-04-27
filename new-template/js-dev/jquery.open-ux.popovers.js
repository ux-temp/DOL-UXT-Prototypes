(function($){
	

	// Attach the new plugin onto the jQuery object.
	$.fn.extend({

		popover: function(options) {

			var defaults = {
				arrow: false
            };

			// Check to see if browser supports rotating css
			if ($('html').is('.csstransforms')) {
				defaults.arrow = true;
			}

            var options =  $.extend(defaults, options);

			return this.each(function() {

				// Get plugin defaults
				var opt = options;

				// Save off the popover container
				var obj = $(this);

				// See if we need to add arrow
				if(opt.arrow) {
					obj.prepend($('<div>').addClass('arrow'));
					var arrow = obj.children('.arrow');
				}

				var link = obj.prev('a');

				link.on('click', function(e) {

					// Stop the anchor from moving forward.
					e.preventDefault();

					// Get the anchors position
					var linkPos = link.offset(), top, left;

					// Popover location
					top = linkPos.top + link.height();
					left = linkPos.left - (obj.outerWidth()/2) + (link.width()/2);

					// Check to make sure if the the left if off the screen if so balance it.
					if (left <= 0) {

						// Check to see if we also need to reposition the window
						if(opt.arrow) {

							// 5 reflects half the width of the arrow.
							//var aLeft = (left * -1) + 5;
							var aLeft = obj.outerWidth()/2 - link.width()/2

							// Apply new styles
							arrow.css({left:aLeft});
						}

						// Set left to be 10px away from the side of the window.
						left = 10; 

					}

					// Check to see if the popover flows over the right side of the screen
					if ((left+obj.outerWidth()) > $(window).width()){

						// Check to see if we also need to reposition the window
						if(opt.arrow) {

							// 5 reflects half the width of the arrow.
							var aLeft = link.width()/2 + obj.outerWidth()/2;

							// Apply new styles
							arrow.css({left:aLeft});
						}
						
						// Set left to be 10px away from the side of the window.
						left = $(window).width() - obj.outerWidth() - 10;

					}

					// Set location onot the popover container
					obj.css({top:top,left:left});

					obj.show();

				});

			});

		}

	});

})( jQuery );