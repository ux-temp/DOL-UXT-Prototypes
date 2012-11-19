/*
 * Navigation Out Warning
 *
 * This plugin simply creates a modal for a user. It is then the responsibility of the user to bind the 
 * said modal to the object events that they require. All buttons created inside of the modal will also
 * default to a close modal event.
 *
 */

(function($){

	/*
	 * navOutWarning Private Functions
	 * ====================================================================================
	 * All functions below this line relate in some means to the navMessage jQuery plug-in
	 *
	 * Function createMultipleElement
	 * Function will create a element and then return them back
	 * Arguments
	 * - mid: corrisponding modal id
	 * - element: jquery blank element
	 * - attributes: javascript object containing any possible attibutes (class, style, id, href,)
	 * - index: number representing the number of times this object has been created.
	 */
	function createElements(mid, element, attributes, index) {
		 
		// loop throught the different attributes an apply them accordingly.
		$.map(attributes, function(v, i) {
			
			//var attr = i.substr(1).toLowerCase();

			switch(i) {
				case "text":
					element.text(v);
					break;
				case "style":
					element.css(v);
					break;
				case "class":
					element.addClass(v);
					break;
				// Attributes to ignore
				case "event":
					break;
				default:
					element.attr(i,v);
					break;
			}
		});
		
		// Check to see if the item being added is a div, if so make sure it stays hidden
		if (element.get(0).tagName.toLowerCase() == "div") {
			element.hide();
		}
		
		// See if we are going to have to generate a fake id.
		if (!attributes.hasOwnProperty("id")) {
			element.attr('id',mid + element.get(0).tagName.toLowerCase() + index);
		}
		
		// Check to see if this is an input "button" and if it has a event attribute. If it does bind it
		// otherwise make the button close the modal.
		if (element.get(0).tagName.toLowerCase() == "input") {
			
			if(!(attributes.hasOwnProperty("event")) ) {
			
			// bind close dialog function to the element
			element.on("click", function(){$(this).parents('#' + mid).dialog("close");});

			} else {
				
				// bind the user defined function to the element
				element.on(attributes.event.trigger, attributes.event.action);
				
			}
			
		}
		// Return the constructed object
		return element;
	}
	 
	/*
	 * Function clickedLink:
	 * Function provides users with a means to access the attrbute of the link that was clicked.
	 * Arguments:
	 * - link: jQuery selection of the link just clicked. 
	 */
	function clickedLinkAttribute(link, attribute) {
		return link.attr(attribute);
	}
	
	/*
	 * Function used to check if an element has a click event bound to it, and if it does to remove it.
	 * Argument:
	 * - element: jQuery selection for the element being checked.
	 */
	function unbindClick(element) {
		// Check to see if there is any data event type specified.
		if($(element).data('events') != undefined) {
			
			// Check to see if the click event is present.
			if ($(element).data('events')['click']) { 
				
				// Un-bind the click event.
				$(element).unbind('click');
			}
		}
	}

	/*
	 * Function createModal:
	 * Function will create a modal on request from the navMessage plugin.
	 * Arguments:
	 * - options: modal creation settings 
	 */
	
	function createModal(id){
		
		// Array controling element creation
		var elementType = {
			image: 'img',
			message: 'p',
			button: 'input type="button"'
		};
		
		var modalElements = $.fn.navOutWarning.modals[id];
		
		// New modal container.
		var newMsgModal = createElements(id, $('<div />'), modalElements.modal, 0);
		
		// Loop through the control element looking for the items that need to be created.
		$.map(elementType, function(v, i) {
			
			// Check to see if the new modal has one of the support dynamic element type.
			if (modalElements.hasOwnProperty(i)) {
				
				modalAttribute = modalElements[i];
				
				if (modalAttribute instanceof Array) {

					for (var a in modalAttribute) {
						newMsgModal.append(createElements(id, $('<' + v + ' />'), modalAttribute[a], a));
					}
				} else {
					newMsgModal.append(createElements(id, $('<' + v + ' />'), modalAttribute, a));
				}
				
			}
			
		});
		
		// Add the modal to the body
		$('body').append(newMsgModal);
	}
	
	/*
	 * ====================================================================================
	 * NavMessage Plug-in
	 */
	$.fn.navOutWarning = function(options){

		// Get a copy of the defaults.
		var tempDefaults = $.extend({},$.fn.navOutWarning.defaults);

		// We are going to loop through the default implementation array looking for
		// the different properties that both the passed options and the default options have.
		$.map(tempDefaults, function(v, i){
			
			if (options.hasOwnProperty(i)) {
				
				// Check to see if the object is empty and needs to be removed from the default
				if ( $.isEmptyObject(options[i]) ) {
					delete options[i];
					delete tempDefaults[i];
				}

			}

		});

		// Extend default options
	    options = $.extend(true, {},tempDefaults, options);
		
	    // Check to see if the modal in questions has been created.
		if ($('#' + options.modal.id).length == 0) {
			
			// Save the modal options to the plug-in namespace.
			$.fn.navOutWarning.modals[options.modal.id] = options;
			
			// Go create the modal.
			createModal(options.modal.id);
		}

		// Sort thing the selected links and removed those that dont move user away from page.
		var allLinks = this;
		
		var filteredLinks = $(this).filter('a:not([href^="#"]):not([target*="blank"]):not([class*="ux-no-block"])'); 

		// Return each link individually and bind the actions accordingly.
		return filteredLinks.each(function(){
			
			var link = $(this);
			
			// Check to see if the link in question has a click event. if so remove it.
			unbindClick(link);
			
			// Bind dialog click event.
			link.click(function(e){
				
				// Prevent he link default action
				e.preventDefault();
				
				// Save off clicked link
				$.fn.navOutWarning.clickedLink = link;

				// Open modal
				$('#' + options.modal.id).dialog({resizeable:false,modal:true});
			});

		});

	};
	
	/*
	 * NavMessage Plug-in default values.
	 */
	$.fn.navOutWarning.defaults = {
		modal: {
		   "id": "genericMsg",
		   "title": "You will lose your work!"
		},
	    // Elements going to be appended inside the modal
		image: {
			"src": uxVar.core.resourcePath +'/images/icons/warning_48.png',
			"alt": "Warning/Caution Message",
			"style": {"float":"left"}
		},
		message: [{
			"text": "By continuing with this action you will be leaving the application, causing all your unsaved work to be lost.",
			"class": "primary-msg"
		},{
			"text": "Are you sure you want to do this?",
			"style": {"text-align":"center"}
		}],
		button: [{
			"value": "Yes",
			"class": "primary button no-icon left-button",
			"style": {"float":"left"},
			"event": {
				"trigger": "click",
				"action": function(){window.location = $.fn.navOutWarning.clickedLink.attr('href');}
			}
		},{
			"value": "No",
			"class": "button no-icon right-button",
			"style": {"float":"right"}
		}]
	};
	
	/*
	 * navOutWarning Namespaces
	 * This section holds the values associated with all the different modals that have been created.
	 */
	$.fn.navOutWarning.modals = {};
	 // This section holds a reference to the link that was just click
	$.fn.navOutWarning.clickedLink;

})( jQuery );