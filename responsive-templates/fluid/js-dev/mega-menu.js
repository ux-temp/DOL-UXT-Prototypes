// Function that runs on page load.
function parse_menu(data) {
	
	  	$.each(data, function(key,section) {
	  		
				if($('#' + key).length == 1) {
					$('#' + key).addClass('drop').after('<div id="' + key +'-contents">');
				}
				
				$.each(section, function(setting, value) {
					
					// Handle left and right setting drop sides.
					if ((setting == 'drop') && (value == 'right')) {
						$('#' + key +'-contents').addClass('align_right');
					}
					
					// Handles container size.
					if (setting == 'size') {
						
						if (value == 1) {
								$('#' + key +'-contents').addClass('dropdown_1column').addClass('mega-menu-contents');
						} else {
								$('#' + key +'-contents').addClass('dropdown_' + value + 'columns').addClass('mega-menu-contents');
						}
						
					}
					
					// Handles adjustment on any positioning.
					if (setting == 'adjust') {
						
						$('#' + key +'-contents').addClass('over_' + value.over);
						
					}
					
					if (setting == 'mega-menu-landing') {
						$('<div></div>').appendTo($('#' + key +'-contents'))
							.addClass('landing-div')
							.attr('id',key + '-mega-menu-landing');
						$('<a></a>').appendTo('#' + key + '-mega-menu-landing')
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
						$.each(value, function(ctype, cvalue) {
							
							var ContentSplit = ctype.split("-");
							
							// Creates the content containers and un-ordered lists
							if(ContentSplit[0] == "container_size") {
								container = container + 1;
								current_container = key + '_content_container_' + container
								current_container_list = key + '_content_container_list_' + container
								
								$('<div></div>').appendTo($('#' + key +'-contents'))
									.attr('id',current_container);	
								$('#' + current_container).addClass(cvalue);
								
								$('<ul></ul>').appendTo($('#' + current_container))
									.addClass('menu-container-list')
									.attr('id',current_container_list);
							}
							
							if (ContentSplit[0] == "container_contents") {
								
								var lastItem = "nothing";
								
								$.each(cvalue, function(conType, conValue) {
									
									// Check to see if we need to add some bottom patting to the last item.
									
									var keyType = conType.split("-");
									
									if ((lastItem == "link") && ((keyType[0] == "header") || (keyType[0] == "linkheader")) || ((lastItem == "linkheader") && ((keyType[0] == "linkheader") || (keyType[0] == "header") ))) {
										$('#'+current_container_list +' li:last a').css({'padding-bottom':'12px'})
									}
									

									
									// Create the new list item.
									$('<li></li>').appendTo($('#' + current_container_list));
									//$('#'+current_container_list +' li:last');
									
									if (keyType[0] == "header"){
										$('<h2></h2>').appendTo($('#'+current_container_list +' li:last'))
											.addClass('menu-header')
											.text(conValue);
										lastItem = "header";
									}
									
									if (keyType[0] == "subheader"){
										$('<h3></h3>').appendTo($('#'+current_container_list +' li:last'))
											.addClass('menu-header')
											.text(conValue);
										lastItem = "header";
									}
									
									if (keyType[0] == "linkheader"){
										$('<h2></h2>').appendTo($('#'+current_container_list +' li:last'))
											.addClass('menu-header');
										$('<a></a>').appendTo($('#'+current_container_list +' li:last h2'))
											.attr('href',conValue.url)
											.text(conValue.text);
										lastItem = "linkheader";
									}	
									
									if (keyType[0] == "sublinkheader"){
										$('<h3></h3>').appendTo($('#'+current_container_list +' li:last'))
											.addClass('menu-header');
										$('<a></a>').appendTo($('#'+current_container_list +' li:last h3'))
											.attr('href',conValue.url)
											.text(conValue.text);
										lastItem = "sublinkheader";
									}									
									
									if (keyType[0] == "link") {
										$('<a></a>').appendTo($('#'+current_container_list +' li:last'))
											.attr('href',conValue.url)
											.addClass('mega-menu-link')
											.text(conValue.text);
										lastItem = "link"
									}
									
								});
								
								// Add bottom padding to last item.
								$('#'+current_container_list +' li:last a').css({'padding-bottom':'5px'});
								
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