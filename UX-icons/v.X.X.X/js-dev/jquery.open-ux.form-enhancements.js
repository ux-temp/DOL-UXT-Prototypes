/*
Form Enhancement Plugin
See Markdown Documentation with plugin for description/documentation/changelog.
*/

/*
Show Hide Password Function
*/
(function($){
	
	// Create the extention for the show hide password plugin
	$.fn.extend({
		showHidePass: function(options) {
			
			// Plugin defaults
			var defaults = {
				type: 'button',
				moreClasses: false
			};

			// Swaps out defaults to the requested overrides
			var options = $.extend(defaults, options);

			return this.each(function(i){
				
				// Passed object
				var obj = $(this);

				// Build on the item we are appending
				if (options.type == 'button') {
					var controlType = $('<input type="button" />')
					.attr({'value':"Show Password"})
					.addClass('show-hide-control');

					var validControl = true;

				} else if (options.type == 'link') {
					var controlType = $('<a href="#">Show Password</a>')
					.addClass('show-hide-control');

					var validControl = true;

				} else {
					// Crash out of the plugin, I have no idea what this person wants.
					var validControl = false;
				}

				if (validControl) {

					// Add additional user classes if listed
					if (options.moreClasses) {
						controlType.addClass(options.moreClasses);
					}

					// Add the click even to the click control.
					$(controlType).click(function(e){
						
						var input = $(this).prev(); // Select the input box
						var inputText = input.val(); // Get the current text value
						var inputType = input.prop('type');// Get the current input box type
						var updatedLabel = (inputType == 'text') ? 'Show Password' : 'Hide Password';// Determine what the next control element text will be.
						
						var attrs = input[0].attributes;// Get all the attributes
						var attributesArr = {}; // new array
						
						// create a key,value map of attributes and values					
						for (var i=0; i <attrs.length; i++) {
							// : Array[key] = value
							if (attrs[i].nodeValue != null) {
								attributesArr[attrs[i].nodeName] = attrs[i].nodeValue;
							}
						}
						var newType = ""; // var for the type of the new input;
						var value = attributesArr[ 'type' ];
						//test for type and determine new
						newType = ((value == 'text') ? 'password' : 'text');
						//remove old from array
						delete attributesArr[ 'type' ];
						
						var newInput = $('<input type="'+newType+'" /> ', attributesArr); // newInput type=newType 
						newInput.val(inputText); // Add the captured text value to the new input
						
						$(this).prev().remove(); // Remove the old input
						// Based on the control type update the control text and add the new text box.
						(options.type == 'button') 
								? $(this).val(updatedLabel).before($(newInput)) 
								: $(this).text(updatedLabel).before($(newInput));

						// Prevent default click event
						e.PreventDefault;
					});

					// Wrap the control
					obj.wrap('<div class="password-wrapper" id="pass-contol-' + i + '" />');

					// Get the wrapper we just created.
					obj = obj.parent();

					// Add the switch control to the DOM
					$(controlType).appendTo(obj);
					
				}

			});

		}
	});
})( jQuery );

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
