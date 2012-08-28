/*
Form Enhancement Plugin
See Markdown Documentation with plugin for description/documentation/changelog.
*/

/*
Show Hide Password Function
*/


/*
Character remaining count
*/
(function($){

// Create the extention for the character remaining text component
$.fn.extend({
	characterCounter: function(options) {
		
		// Plugin defaults
		var defaults = {
			limit: 256,
			position: 'bottom',
			placement: 'right',
			messageText: 'Characters Remaining:'
		};

		// Swaps out defaults to the requested overrides
		var options = $.extend(defaults, options);

		// Loop through all of the possible passed examples.
		return this.each(function(i) {

			// Save of the passed object
			var obj = $(this);
			
			// Build the character count
			var countBoxSpan = $('<span class="char-limit-text-box "/>').text(options.messageText);
			
			var charCountContainer = 0;
			
			if (obj.hasClass('ux-placeholder')) {
				// If ux-placeholder is present then the option limit should be shown
				charCountContainer = $('<span class="char-limit-display cld-' + options.placement + '" />')
										.text(options.limit)
										.appendTo(countBoxSpan);
			} else {
				// since ux-placeholder is not present we need to figure out the number of characters used.
				charCountContainer = $('<span class="char-limit-display cld-' + options.placement + '" />')
											.text((options.limit - obj.val().length))
											.appendTo(countBoxSpan);
			}
		
			// Wrap the passed object in a div container
			obj.wrap('<div id="count-input-container-' + i + '" class="count-input-container posx-'+options.placement+' posy-'+options.position+'" />')
				.after(countBoxSpan);
			

			// bind events the events to trigger update
			$(obj).bind( 'keyup change ', function() {
				// check for chars over
				if( obj.val().length > options.limit ) {
					// if over, remove the extra characters
                	obj.val( obj.val().substring(0,options.limit) );
                }
				// update number
                countBoxSpan.children('.char-limit-display').text(options.limit - obj.val().length);
			});

		});
	}
});
})( jQuery );
