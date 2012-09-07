(function($){
	
	// Create the plugin
	$.fn.uxMenus = function(options) {
		
		var defaults = {

		};

		defaults = $.extend(defaults,options);


		// Loop through all passed elements in the selector array.
		return this.each(function(i) {


			// Save off the current object
			var menu = $(this);

			// Check to make sure the item has a sub container before continuing
			if (menu.next('div:first').length) {

				var menuSub = menu.next('div:first'),
				menuLi = menu.parent('li');

				// Add the submenu class
				menu.addClass('ux-submenu');

				// Bind the click event the menu items
				menu.on("click", function(e) {

					// Prevent default action.
					e.preventDefault();

					//alert(menu.text());

					// Remove the class from any other selected item if it exists.
					menuLi.siblings('.selected').removeClass('selected');

					// Toggle the selected menu show/hide.
					if (!menuSub.is(':visible')) {
						menuLi.addClass('selected');
					} else {
						menuLi.removeClass('selected');
					}

				});

			}
			
		});

	}

})( jQuery );