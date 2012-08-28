(function($){
	
	// Create the extention for the show hide password plugin
	$.fn.extend({
		showHidePass: function(options) {
			
			// Plugin defaults
			var defaults = {
				type: 'button',
				showText: "Show Password",
				hideText: "Hide Password",
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
					.attr({'value': options.showText})
					.addClass('show-hide-control');

					var validControl = true;

				} else if (options.type == 'link') {
					var controlType = $('<a href="#"></a>')
					.addClass('show-hide-control').text(options.showText);

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
					$(controlType).on('click', function(e){

						// Prevent default click event
						e.preventDefault();
						
						var input = $(this).prev(); // Select the input box
						var inputText = input.val(); // Get the current text value
						var inputType = input.prop('type');// Get the current input box type
						var updatedLabel = (inputType == 'text') ? options.showText : options.hideText;// Determine what the next control element text will be.
						
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