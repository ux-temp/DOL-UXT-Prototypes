$(document).ready(function(){

	// Select only the first level items
	$('#domain-menu > ul > li > a').each(function(){
		
		menu = $(this);

		// Check to see if the menu items has a sub-container
		if (menu.next('div:first')) {

			// Add class to implement the drop down arrow.
			menu.addClass('ux-submenu');
		
			menu.on('click', function(e){

				e.preventDefault()

				// Sub container
				var menuSub = $(this).next('div:first')

				// Hide any other active menu item
				menuSub.parent('li').siblings('li.selected').removeClass('selected').children('div.ux-active').hide().removeClass('ux-active');

				$(this).next('div:first').addClass('ux-active').toggle(0, function(){
					if ($(this).is(':visible')) {
						$(this).parent('li').addClass('selected');
					} else {
						$(this).parent('li').removeClass('selected');
					}
				});
				
			});

		}

	});

});