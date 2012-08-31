/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * 
 * Modified on November 17 2011
 * Added shortcutProcessor function for provide a central parser that will process
 * any passed Javascirpt Object that is properly constructed below into a jQuery UI Modal
 *
 * Created by New York State Department of Labor
*/
function shortcutProcessor(kbs){
	
	//Create the legend list
	if(kbs.legendList) {
		$.each(kbs.legendList, function(k,v){
			
			// Check to see if the legend conficts with an existing element. If not creat it.
			if (!$('#' + this.legend.id).length) {

				// Add default styling
				if (this.legend.style){
					this.legend.style = this.legend.style + "display:none;";
				} else {
					this.legend['style'] = "display:none;";
				}

				var newLegend = $('<div>',this.legend);
				var newLegendList = $('<dl>');

				// Add Custom Classes if listed
				if (this.legend.customClasses){
					newLegend.addClass('keyboard-shortcut-legend ' + this.legend.customClasses);
				} else {
					newLegend.addClass('keyboard-shortcut-legend');
				}

				$(newLegendList).appendTo(newLegend);
				$(newLegend).appendTo('body');
			}

		});
	}

	// Screate Shortcuts 
	if(kbs.shortcutList){
		
		$.each(kbs.shortcutList, function(k,v){
			$(this.shortcut.key_scope).bind(this.shortcut.key_method, this.shortcut.key_combo, this.shortcut.key_function);

			// Add shortcut to a legend list only if the legend is defined.
			if(this.shortcut.key_legend) {
				// Legend we will be targetting
				var legendTarget = $('#' + this.shortcut.key_legend + ' dl');
				var newdt = $('<dt>');
				var newdd = $('<dd>',{text:this.shortcut.key_description});

				var keys = this.shortcut.key_combo.split('+');

				for(var i=0; i<keys.length; i++){
					
					// Append plus sign when needed.
					if(i) {
						newdt.append('+');
					}

					$('<kbd>',{text:keys[i]}).appendTo(newdt);
				}

				(newdt).appendTo(legendTarget);
				(newdd).appendTo(legendTarget);
			}

		});
	}

}

(function(jQuery){

	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},

		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}

		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");

		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );