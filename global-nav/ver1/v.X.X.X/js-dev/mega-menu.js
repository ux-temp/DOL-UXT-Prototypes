// Function that runs on page load.
function parse_menu(data) {
	
	  	jQuery.each(data, function(key,section) {
	  		
				if(jQuery('#' + key).length == 1) {
					jQuery('#' + key).addClass('drop').after('<div id="' + key +'-contents">');
				}
				
				jQuery.each(section, function(setting, value) {
					
					// Handle left and right setting drop sides.
					if ((setting == 'drop') && (value == 'right')) {
						jQuery('#' + key +'-contents').addClass('align_right');
					}
					
					// Handles container size.
					if (setting == 'size') {
						
						if (value == 1) {
								jQuery('#' + key +'-contents').addClass('dropdown_1column').addClass('mega-menu-contents');
						} else {
								jQuery('#' + key +'-contents').addClass('dropdown_' + value + 'columns').addClass('mega-menu-contents');
						}
						
					}
					
					// Handles adjustment on any positioning.
					if (setting == 'adjust') {
						
						jQuery('#' + key +'-contents').addClass('over_' + value.over);
						
					}
					
					if (setting == 'mega-menu-landing') {
						jQuery('<div></div>').appendTo(jQuery('#' + key +'-contents'))
							.addClass('landing-div')
							.attr('id',key + '-mega-menu-landing');
						jQuery('<a></a>').appendTo('#' + key + '-mega-menu-landing')
							.addClass('mega-menu-landing-link')
							.addClass('button')
							.addClass('next')
							.addClass('icon-right')
							.addClass('right')
							.attr('href',value.link)
							.text(value.url);
					}
					
					// Handles content.
					if (setting == 'content') {
						
						var container = 0;
						var current_container = "";
						var current_container_list = "";
						
						// Loop through the container section and fill in the contents
						jQuery.each(value, function(ctype, cvalue) {
							
							var ContentSplit = ctype.split("-");
							
							// Creates the content containers and un-ordered lists
							if(ContentSplit[0] == "container_size") {
								container = container + 1;
								current_container = key + '_content_container_' + container
								current_container_list = key + '_content_container_list_' + container
								
								jQuery('<div></div>').appendTo(jQuery('#' + key +'-contents'))
									.attr('id',current_container);	
								jQuery('#' + current_container).addClass(cvalue);
								
								jQuery('<ul></ul>').appendTo(jQuery('#' + current_container))
									.addClass('menu-container-list')
									.attr('id',current_container_list);
							}
							
							if (ContentSplit[0] == "container_contents") {
								
								var lastItem = "nothing";
								
								jQuery.each(cvalue, function(conType, conValue) {
									
									// Check to see if we need to add some bottom patting to the last item.
									
									var keyType = conType.split("-");
									
									if ((lastItem == "link") && ((keyType[0] == "header") || (keyType[0] == "linkheader")) || ((lastItem == "linkheader") && ((keyType[0] == "linkheader") || (keyType[0] == "header") ))) {
										jQuery('#'+current_container_list +' li:last a').css({'padding-bottom':'12px'})
									}
									

									
									// Create the new list item.
									jQuery('<li></li>').appendTo(jQuery('#' + current_container_list));
									//jQuery('#'+current_container_list +' li:last');
									
									if (keyType[0] == "header"){
										jQuery('<h2></h2>').appendTo(jQuery('#'+current_container_list +' li:last'))
											.addClass('menu-header')
											.text(conValue);
										lastItem = "header";
									}
									
									if (keyType[0] == "subheader"){
										jQuery('<h3></h3>').appendTo(jQuery('#'+current_container_list +' li:last'))
											.addClass('menu-header')
											.text(conValue);
										lastItem = "header";
									}
									
									if (keyType[0] == "linkheader"){
										jQuery('<h2></h2>').appendTo(jQuery('#'+current_container_list +' li:last'))
											.addClass('menu-header');
										jQuery('<a></a>').appendTo(jQuery('#'+current_container_list +' li:last h2'))
											.attr('href',conValue.url)
											.text(conValue.text);
										lastItem = "linkheader";
									}	
									
									if (keyType[0] == "sublinkheader"){
										jQuery('<h3></h3>').appendTo(jQuery('#'+current_container_list +' li:last'))
											.addClass('menu-header');
										jQuery('<a></a>').appendTo(jQuery('#'+current_container_list +' li:last h3'))
											.attr('href',conValue.url)
											.text(conValue.text);
										lastItem = "sublinkheader";
									}									
									
									if (keyType[0] == "link") {
										jQuery('<a></a>').appendTo(jQuery('#'+current_container_list +' li:last'))
											.attr('href',conValue.url)
											.addClass('mega-menu-link')
											.text(conValue.text);
										lastItem = "link"
									}
									
								});
								
								// Add bottom padding to last item.
								jQuery('#'+current_container_list +' li:last a').css({'padding-bottom':'5px'});
								
							}
						
						});
						
					}
				});
				
	  	});
	
}

jQuery(document).ready(function() {

	if (control_loop == 0) { 
		parse_menu(mega_menu);
		control_loop = 1;
	}
	
});