/**
 * User Experiance Object v.2
 * This is a revamp of the original ux object. This verion benefits from addtional functionality and optimization.
 */

if (!window['ux']) {

	// Core UX object
	window['ux'] = {};
	
	/**
	 * The following section outlines different sub-objects that make up the ux-object
	 * @core - Core contains root level variables that are used by different features.
	 * @features - Features contains core level function used to when interaction with the object.
	 * @libraries - Libraries contains all of the UX supported external libraries and setting.
	 * @functions - Contains functions not currently stored in external libraries
	 * @dom - Saving ground for commonly selected DOM Element when using jQuery,
	 */
	window['ux']['core'] = {};
	window['ux']['features'] = {};
	window['ux']['libraries'] = {};
	window['ux']['functions'] = {};
	window['ux']['dom'] = {};

	/**
	 * ===============================================================
	 * Core ===
	 * The following variable are the core of the ux object to load/setup 
	 * ===============================================================
	 */
	ux.core.browser = BrowserDetect.browser.toLowerCase();
	ux.core.protocol = location.protocol;
	ux.core.extPrefix = ".min";
	ux.core.folderSuffix = "";

	// Following section reterives important information as the script is executes
	var scriptEls = document.getElementsByTagName( 'script' ),
	thisScriptEl = scriptEls[scriptEls.length - 1],
	scriptPath = thisScriptEl.src;

	// Save off the path to the current veriable set including the version number
	ux.core.resourcePath  = scriptPath.substr(0, scriptPath.lastIndexOf( '/v.' )+8);

	// Save off the version number
	ux.core.version = ux.core.resourcePath.substr(scriptPath.lastIndexOf( '/v.' ) + 1 , scriptPath.lastIndexOf( '/v.' ) +8 );

	/**
	 * ===============================================================
	 * UX Features ===
	 * The following section contains all of the features build for the ux-object
	 * ===============================================================
	 */

	/**
	 * This function is used to create shorthand aliases inside of the ux-object
	 */
	ux.features.alias = function(alias, loc) {

		// Check to make sure the name space is open.
		if (!window['ux'][alias]) {

			window['ux'][alias] = loc;

		} else {
			console.log("Sorry you cant make a shortcute to:" + alias);
		}

	};

	/**
	 * This function is used to save dom searched element into a variable for possible use laster
	 */
	ux.features.domSaver = function(searchItem, searchName) {
		// Simply adds the items to the ux.dom object space.
		ux.dom[searchName]= jQuery(searchItem);
	},

	/**
	 * This feature fills in the basic ux variables that have not been defined. 
	 * 
	 * @parameters:
	 * callback - [function] - allows the user to change the default value of anything after the all default actions have taken place.
	 */
	ux.features.startup = function(callback) {

		// Check for a ux.before function if it exists.
		if (window['beforeUX'] != undefined && typeof(window['beforeUX']) == "function") {
			beforeUX();
		}

		// Add browser class from the PPK Browser Detect Script loaded as part of the default assets
		jQuery('body').addClass(ux.core.browser);

		// Extend some basic jQuery functionality.
		jQuery.extend({
			getUrlVars: function(){
			  var vars = [], hash;
			  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			  for(var i = 0; i < hashes.length; i++)
			  {
			    hash = hashes[i].split('=');
			    vars.push(hash[0]);
			    vars[hash[0]] = hash[1];
			  }
			  return vars;
			},
			getUrlVar: function(name){
			  return jQuery.getUrlVars()[name];
			}
		});

		/*****
		 * Fix tab focus items.
		 ******/
		if (ux.core.browser == "chrome" || ux.core.browser == "safari" || ux.core.browser == "opera") {
			jQuery("#skip-to-content").click( function() {
				jQuery('#content-anchor').focus();
			});
			jQuery("#skip-to-menu").click( function() {
				jQuery('#mega-menu-anchor').focus();
			});
			jQuery("#skip-to-nav").click( function() {
				jQuery('#navigation-anchor').focus();
			});
		}

		// Define a few shortcuts right away (UX RESERVED).
		ux.features.alias("status",ux.features.status);
		ux.features.alias("load",ux.features.load);
		ux.features.alias("domSaver",ux.features.domSaver);
		ux.features.alias("override",ux.features.override);

		// Pollyfill support lack of css 3 support
		jQuery('#navigation-vertical ul li:first-child, #dol-footer ul li:first-child').addClass('first-child'); // allows css fixes for browser that do not understand pseudoclasses
		jQuery('#navigation-vertical ul li:last-child, #dol-footer ul li:last-child').addClass('last-child'); 
		
		jQuery('.dol-container .dol-container:first-child').addClass('first-child');
		jQuery('.dol-container .dol-container:last-child').addClass('last-child');
		
		jQuery('.layout-table-content>.layout-2-col:first-child').addClass('first-child');
		jQuery('.layout-table-content>.layout-2-col:last-child').addClass('last-child');
		jQuery('table tr:last-child').addClass('last-child');
		jQuery('thead th:last-child').addClass('last-child');
		jQuery('tr td:last-child').addClass('last-child');
		jQuery('table.row-stripe tr:odd').addClass('table-row-odd');
		jQuery('table.row-stripe tr:even').addClass('table-row-even');
		
		if (ux.core.browser == "msie") {
			if (jQuery('body').hasClass('ie7')) {
				jQuery('.ie7 tfoot tr:last-child').addClass('last-child');
				jQuery('.ie7 .ux-wizard li:last-child').addClass('last-child');
			}
		}

		// Call back function to run once everything else has been setup.
		if (typeof(callback) == "function") {
			callback();
		}

		if (document.getElementById('navigation-vertical')) {
			ux.load("expandables");
		}		

		// Setup A-Z Indexes if they are needed.
		if (jQuery('.ux-a-z-index').length) {
			jQuery('.ux-a-z-index a').each(function() {
				jQuery(this).click(function(event) {
					// Prevent link click event
					event.preventDefault();
					var selection = jQuery(this).text();
					
					if (selection == "#") {
						selection = "numbers";
					}
					
					switch_selected(selection);
				});
			});
		}

		if (jQuery('#gov-link-3').length) {

			jQuery('#gov-link-3').on('click', function(e){
				e.preventDefault();
				jQuery(this).hide();
				jQuery('#nys-search').show();
				jQuery('#nys-search-box').focus();
			});
		}

		// Run Placeholder
		ux.load("placeHolder");

		// Run Qtips
		ux.load("qtip");

		// Get the page anchors link
		ux.domSaver('.ux-content-grid a, #dol-footer-inner a',"uxPageAnchors");

		// Run link icons
		ux.load("linkIcons");

	};

	/**
	 * This feature outputs to the console letting the user now what has happened in the ux-object
	 */
	ux.features.status = function() {

		// Save of the basic values
		var status =
			"Current state of this UX page:" +
			"\n\nUX version: " + ux.core.version + 
			"\nProtocal used: " + ux.core.protocol +
			"\nBrowser detected: " + ux.core.browser +
			"\nFile Extention Prefix: " + ux.core.extPrefix +
			"\nFolder Suffix: " + ux.core.folderSuffix +
			"\nAsset Resource Path: " + ux.core.resourcePath +
			"\n\nLazyLoadable Library State:\n\n";

		// Loop through all of the functions
		for ( func in ux.libraries) {
			status += func + ": " + ux.libraries[func].isLoaded + "\n";
		}

		status += "\n\nFunction State:\n\n";

		for ( func in ux.functions) {
			status += func + ": " + ux.functions[func].isLoaded + "\n";
		}

		// Print values out to the console.
		console.log(status);
	};

	/**
	 * This function is used to load external javascript functions and other UX supported libraries
	 */
	ux.features.load = function(request, callback) {

		// First we need to determine what we have to load.
		if (typeof(request) == "string") {
			// Strings are simple load instructions and be simply passed to test functions.
			testRequest(request, callback);

		} else if (typeof(request) == "object") {

			// We know we have an object but that means it could be an array check that first.
			if (request instanceof Array) {

				// Since we have an array lets loop it can based on contents continue or recall function as needed
				for (var i = 0, r = request.length; i < r; i++) {
    					
    				if(typeof(request[i]) == "string") {

    					// String can be sent for testing
    					testRequest(request[i]);

    				} else if (typeof(request[i]) == "object") {

    					// Sub-objects will need to be sent right back through this process
    					ux.features.load(request[i]);

    				} 

				}

			// At this point we check the object for the load property. If its there preform the lazy load, otherwise skip the object.
			} else if ("load" in request) {

				// Build a fake call back function just in case
				var cbFunction = ("callback" in request) ? request.callback : undefined

				// Send the object request ahead
				testRequest(request.load, cbFunction);

			}

		}

		// This sub-function is used to test individual request items for supported/internal existance.
		function testRequest(request, callback) {

			// Check to see if the item is in the libraries list
			if (request in ux.libraries) {

				// Request is a trusted lib; Test to make sure the current lib is not already loaded before calling loader
				if (!ux.libraries[request].isLoaded) {
					
					// Lastly test for dependencies
					if (ux.libraries[request].hasOwnProperty('dependencies')) {

						var depType = typeof(ux.libraries[request].dependencies);

						// Call the load process for the dependencies
						ux.features.load(ux.libraries[request].dependencies);

					}
					
					// With all the dependencies loaded we load the requested library
					loader(true, ux.libraries[request], callback);

				} else {

					// Item was loaded check to see if it has an error property to write out
					if (ux.libraries[request].hasOwnProperty('deprecated')) {
						console.log (ux.libraries[request].deprecated);
					}

				}

			} else if (request in ux.functions) {
					
				executer(request, callback);

			} else {

				// Calling the setup function which wih then generate the correct load function
				console.log ("Unsupported items (" + request + ") requested. Check the syntax for a supported library or directly load item using the lazy load script not the ux.load");

			}

		}

		/**
		 * Preforms the actually loading of supported and external files.
		 * 
		 * @parameters:
		 *
		 */
		function loader(trusted, request, callback) {

			// Check to see if the request was a trusted asset
			if (trusted) {

				// Check to see if styles to load fist
				if (request.hasOwnProperty('styles')) {

					var styles = request.styles;

					if (typeof(styles) == "string") {
						// If we have a string simply load the file
						LazyLoad.css(assetPath(styles, 'css'));

					} else {
						// If we have an array load them all with a loop
						for (var i = 0, r = styles.length; i < r; i++) {
    					
							LazyLoad.css(assetPath(styles[i], 'css'));

						}
					}

	
				}

				// Check to see if there is a script to load
				if (request.hasOwnProperty('script')) {
					LazyLoad.js(assetPath(request.script, 'js'), function() {

						// Execute any supported default functions before the final callback.
						if (request.hasOwnProperty('defaultFunction')) {
							request.defaultFunction();
						}

						// Execute any possible callback function once everything has been loaded.
						if(typeof(callback) == "function") {
							callback();
						}

						// Mark the asset as loaded
						request.isLoaded = true;

					});
				}

			}

		}

		// Used to execute no library functions
		function executer(request, callback) {

			if (!ux.functions[request].isLoaded) {

				// Execute the functions
				ux.functions[request].defaultFunction();

				// Mark the function as loaded
				ux.functions[request].isLoaded = true;

			}

			
		}

		// Generates the correct pathing based on the type of Item requested.
		function assetPath(request, type) {
			
			return ux.core.resourcePath + "/" + type + ux.core.folderSuffix + "/" + request + ux.core.extPrefix + "." + type;

		}

	}

	/**
	 * This function is used to extend a given set of defaultSettings found inside of a ux.libraries or ux.functions
	 */
	ux.features.override = function(request, obj, act) {

		// First figure out where the requested object is being stored.
		if ((request in ux.libraries) && ("defaultSettings" in ux.libraries[request])) {

			// Call the overriding function
			overrideAction(ux.libraries[request].defaultSettings, obj, act);

		} else if ((request in ux.functions) && ("defaultSettings" in ux.functions[request])) {

			// Call the overriding function
			overrideAction(ux.functions[request].defaultSettings, obj, act);

		}

		function overrideAction(origObj, newObj, act) {

			if (act) {

				// Remove everything found in the current object
				for (member in origObj) {
					delete member;
				}

				// Extend the blank object
				origObj = jQuery.extend(origObj, newObj);

			} else {

				// Simply do an extend on the original object
				origObj = jQuery.extend(origObj, newObj);

			}

		}

	}


	/**
	 * ===============================================================
	 * UX Libraries section. This area defines UX supproted libraries.
	 * ===============================================================
	 */

	 ux.libraries = {
		dataTables:{
			script: "jquery.dataTables",
			defaultElement: ".jQDataTables",
			defaultSettings: {
				"bPaginate": true,
				"sPaginationType": "full_numbers",
				"bSort": true,
				"aaSorting" : [], 
				"bInfo": true,
				"bAutoWidth": true,
				"bLengthChange": false,
				"bFilter": true,
				"bRetrieve": true,
				"bJQueryUI": true
			},
			defaultFunction: function(){
								
				// this stuff needs to run before the .dataTable, cause then it removes the rows from the dom and will not add the icons and crash expand content.
				jQuery('.ux-jQDT-row-expandable').each( function () {
					var trigger = jQuery(this).find('a.ux-jQDT-row-expand-trigger');
					trigger.prepend( '<img src="' + ux.core.resourcePath +'/images/icons/add.png" class="ux-jQDT-row-expand-img">' )
					jQuery(this).find('.ux-jQDT-row-expand-content').hide();
				});
				
				// Add function for DataTables Expandables
				function jQDTExpand_FormatDetails ( targetDiv )
				{
					var expandData = targetDiv.html();
					var sOut = '<div class="ux-jQDT-row-expanded-content">' + expandData + '</div>';
					return sOut;
				}
				
				var jQDTExpand_icon_closed = ux.core.resourcePath + "/images/icons/add.png";
				var jQDTExpand_icon_opened = ux.core.resourcePath + "/images/icons/delete.png";
				 
				jQuery('a.ux-jQDT-row-expand-trigger').on('click', function () {	
					var thisTr = jQuery(this).closest( 'tr' );
					var nTr = thisTr[0]; //needed this "[0]" to pass 'this' instead of jQuery(this)

					var targetDiv = jQuery(this).next('.ux-jQDT-row-expand-content');
					var oTable = jQuery(this).closest( 'table.data-table' ).dataTable( { "bRetrieve" : true } ) ; // get data-table
					var trig_img = jQuery(this).find('img.ux-jQDT-row-expand-img')[0];
					
					if ( trig_img.src.match( jQDTExpand_icon_opened ) ) {
						// This row is already open - close it 
						trig_img.src = jQDTExpand_icon_closed;
						oTable.fnClose( nTr );
					} else {
						// close all expands in this row 
						jquery(thisTr).find( 'a.ux-jQDT-row-expand-trigger' ).each( function (){
							jQuery(this).find('img.ux-jQDT-row-expand-img')[0].src = jQDTExpand_icon_closed;
						});	oTable.fnClose( nTr );
					
						// then open this expand 
						trig_img.src = jQDTExpand_icon_opened;
						oTable.fnOpen( nTr, jQDTExpand_FormatDetails(targetDiv), 'ux-jQDT-row-expanded' );
					}
					
					return false; // don't send the AHREF
				});

				// Apply our own defaults
				jQuery.extend( jQuery.fn.dataTable.defaults,this.defaultSettings);
					
				// Setup the default implementation of dataTables.
				jQuery(this.defaultElement).dataTable();
				
			},
			isLoaded: false
		},
		jqueryUI: {
			script: "jquery-ui-core",
			isLoaded: false
		},
		jqueryTabs: {
			script: "jquery-ui-tabs",
			defaultElement: ".jQTabs",
			defaultSettings: {},
			defaultFunction: function(){
				jQuery(this.defaultElement).tabs(this.defaultSettings);
			},
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryDatePicker: {
			script: "jquery-ui-datepicker",
			defaultElement: ".jQDatePicker",
			defaultSettings: {
				showAnim: '',
				showOn: "both",
				buttonText: 'Datepicker',
				buttonImage: ux.core.resourcePath + "/images/icons/calendar_disabled.png",
				buttonImageOnly: true,
				changeMonth: true,
				changeYear: true
			},
			defaultFunction: function() {
				
				// Setup Datepicker items
				jQuery( this.defaultElement ).datepicker( this.defaultSettings );   
			},
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryAccordion: {
			// No current default implementation by UX.
			script: "jquery-ui-accordion",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryAutoComplete:{
			// No current default implementation by UX.
			script: "jquery-ui-autocomplete",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryButton: {
			// No current default implementation by UX.
			script: "jquery-ui-button",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryDialog: {
			// No current default implementation by UX.
			script: "jquery-ui-dialog",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jquerySlider: {
			// No current default implementation by UX.
			script: "jquery-ui-slider",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		jqueryProgressBar: {
			// No current default implementation by UX.
			script: "jquery-ui-progressbar",
			dependencies: "jqueryUI", 
			isLoaded: false
		},
		jqueryDynaTree: {
			script: "jquery.dynatree",
			dependencies: "jqueryUI", 
			isLoaded: false
		},
		cookie: {
			script: "jquery.cookie",
			isLoaded: false
		},
		qtip: {
			script: "jquery.qtip",
			defaultElement: "abbr, dfn, acronym",
			defaultSettings: {
				content: {
					text: function(api) {
						return jQuery(this).attr('title');
					}
				},
				position: {
					target: 'event'
				},
				show: {
					event: 'mouseenter click'
				},
				hide: {
					event: 'mouseleave'
				}
			},
			defaultFunction: function() {
			
				/*
				 * Initial Configuration
				 */
				jQuery.fn.qtip.defaults = {
					prerender: false,
					id: false,
					overwrite: true,
					content: { text: true, attr: 'title', 
							title: { text: false, button: false	}
					},
					position: {	
							my: 'bottom center', 
							at: 'top center', 
							target: false, 
							container: false, 
							viewport: jQuery(window),
							adjust: { x: 0, y: 0, mouse: true, resize: true	},
							effect: true
					},
					show: {
						target: false,
						event: 'mouseenter',
						effect: true,
						delay: 300,
						solo: true,
						ready: false,
						modal: false
					},
					hide: {
						target: false,
						event: 'mouseleave',
						effect: true,
						delay: 0,
						fixed: false,
						inactive: false
					},
					style: {
						classes: '',
						widget: false,
						tip: {
							corner: true,
							mimic: false,
							width: 8,
							height: 8,
							border: true,
							offset: 0
						}
					},
					events: {
						render: null,
						move: null,
						show: null,
						hide: null,
						toggle: null,
						focus: null,
						blur: null
					}
				};
				
				// Default implementation
				jQuery(this.defaultElement).qtip(this.defaultSettings);
				
				// setting up the cloneable variables
				var ux_contexthelpImg = jQuery('<img />');
				jQuery(ux_contexthelpImg).attr( "class", "ux-contexthelp-img" );
				jQuery(ux_contexthelpImg).attr( "src", ux.core.resourcePath +"/images/icons/help.png" );
				jQuery(ux_contexthelpImg).attr( "alt", "Click for help information." );
				var ux_contexthelpAnchor = jQuery('<a href=""></a>'); 
				jQuery(ux_contexthelpAnchor).attr( "class", "ux-contexthelp-anchor ux-no-block" ); //no-block for nav-out-warn
				
				// do the meat and bones for contexthelp
				jQuery(".ux-contexthelp").each( function() {
					var text = jQuery(this).text();
					var helpAnchor_clone = jQuery(ux_contexthelpAnchor).clone();
						jQuery(helpAnchor_clone).qtip( {
							content: text,
							position: {
								target: 'event'
							},
							show: {
								event: 'click',
								delay: 0
							},
							hide: {
								event: 'click unfocus'
							}
						} );
						
					var helpImg_clone = jQuery(ux_contexthelpImg).clone();
					jQuery(helpAnchor_clone).append( jQuery(helpImg_clone) );
					if (jQuery(this).siblings('.ux-main-label').length > 0) {
						jQuery(this).siblings('.ux-main-label').append(jQuery(helpAnchor_clone));
					} else {
						jQuery(this).before( jQuery(helpAnchor_clone) );
					}
				});
				
				// click on anchor does not redirect;
				jQuery(".ux-contexthelp-anchor").click( function() {
					return false;
				});
				
			},
			isLoaded: false
		},
		formEnhancements: {
			deprecated: "This functionality is no longer avaliable please lookup see the documentation about the split of show hide password and character counter functionality",
			isLoaded: true
		},
		characterCounter: {
			script: "jquery.open-ux.character-counter",
			styles: "jquery.open-ux.character-counter-overrides",
			isLoaded: false
		},
		showHidePassword: {
			script: "jquery.open-ux.show-hide-password",
			defaultElement: ".ux-password-show-hide",
			defaultSettings: {
				moreClasses:'button_mini no-icon'
			},
			defaultFunction: function() {
				jQuery(this.defaultElement).showHidePass(this.defaultSettings);
			},
			isLoaded: false
		},
		keyboardShortcuts: {
			script: "jquery.open-ux.keyboard-shortcuts",
			dependencies: "jqueryDialog",
			isLoaded: false
		},
		notifications: {
			script: "jquery.open-ux.notifications",
			isLoaded: false
		},
		navOutWarning: {
			script: "jquery.open-ux.navigational-warning",
			dependencies: "jqueryDialog",
			defaultSettings: {},
			defaultFunction: function(selector){
				// Some logic to help out the click binding.
				
				if (!selector) {
					// nothing was passes so we are going to assume all links on the page need to have the following click event bound to them.
					ux.domSaver("a","uxAllAnchors");
					selector = ux.dom.uxAllAnchors;
				}
				// Just all the jquery plugin with no paramaters.
				jQuery(selector).navOutWarning(this.defaultSettings);
			},
			isLoaded: false
		},
		fullCalendar: {
			script: "jquery.fullcalendar",
			dependencies: "jqueryUI",
			isLoaded: false
		},
		video: {
			script: "video",
			isLoaded: false
		},
		sugar: {
			script: "sugar",
			isLoaded: false
		},
		swfobject: {
			script: "swfobject",
			isLoaded: false
		},
		popover: {
			script: "jquery.open-ux.popovers",
			defaultElement: ".ux-popover",
			defaultFunction: function(){
				jQuery(this.defaultElement).popover();
			},
			isLoaded: false
		},
		textExpander: {
			script: "jquery.expander",
			isLoaded: false
		},
		joyRide: {
			script: "jquery.joyride",
			isLoaded: false
		},
		validation: {
			script: "jquery.validationEngine",
			styles: ["jquery.validationEngine","jquery.validationEngine-overrides"],
			dependencies: "validationRegEx",
			isLoaded: false
		},
		validationRegEx: {
			script: "jquery.validationEngine-en",
			defaultSettings: {},
			defaultFunction: function() {
				jQuery.validationEngineLanguage.allRules = jQuery.extend(jQuery.validationEngineLanguage.allRules, this.defaultSettings);
			},
			isLoaded: false
		},
		selectBoxEnhancement: {
			script: "jquery.chosen",
			styles: ["jquery.chosen","jquery.chosen-overrides"],
			defaultElement: ".ux-enhance-select",
			defaultSettings: {},
			defaultFunction: function(){
				jQuery(this.defaultElement).chosen(); 
			},
			isloaded: false
		}
	}

	/**
	 * ===============================================================
	 * UX Functions section. This area defines UX framework functions.
	 * ===============================================================
	 */

	 ux.functions = {
	 	expandables: {
	 		defaultFunction: function() {

	 			ux.features.domSaver('a.ux-expandable','pageExpandables');

	 			(ux.dom.pageExpandables).each(function(){

	 				var obj = jQuery(this), 
	 				onlyOne = false;

	 				// Fix list bullets being shown.
	 				if (obj.parent().is('li')) {
	 					obj.parent().css('list-style','none').addClass('expandable-list');
	 				}

	 				// Check to see if the root object has ux-only-one declaired
	 				if(obj.parents().is('.ux-only-one')) {
	 					onlyOne = true;
	 				}

	 				obj.on("click", function(e) {
						e.preventDefault();
						
						var obj = jQuery(this);

						// Check if we have a content container with ux-only-one 
						if (onlyOne) {

							// Do the extra step to make sure siblings are closed
							checkSibs(obj);

						} else {

							// Just do a normal close process
							openClose(obj);
						} 

						function checkSibs(obj) {
							openClose(obj.parent('li').siblings('li').children('.ux-expandable.expanded'))
							openClose(obj);
						}

						function openClose(obj) {

							// Expandable container
							var container = obj.next();

							// Check to make sure the next sibling is something we want to work with
							if (jQuery(container).is('ul') || jQuery(container).is('div')) {

								// Check if we need to show or hide.
								if (obj.hasClass("expanded")) {
									container.slideUp();
									obj.removeClass("expanded");
								} else {
									container.slideDown();
									obj.addClass("expanded");
								}

							}

						}

					});

	 			});

	 		},
	 		isLoaded: false
	 	},
	 	modalLoader: {
			defaultFunction: function() {
				
				/*
				 * Loads some key functions that have not been loaded just yet.
				 */
				 
				 // This function is responsible for displaying the modal.
				function modal_loader( displayText ) {
					var posTop = 300;
					
					jQuery('<div></div>').appendTo('body')
						.attr('id','modal-background')
						.css({'width':jQuery(document).width(),'height':jQuery(document).height()});	
						
					// Create a new popup window.
					jQuery('<div></div>').appendTo('body')
						.attr('id','modal-div')
						.css({'top':posTop,'left':((jQuery(window).width() / 2) - (jQuery('#modal-div').width() / 2))});
						
					// Create the mediaspace area in new-player-modal.
					jQuery('<div></div>').appendTo('#modal-div')
						.attr('id','loading-div');
					
					jQuery('#loading-div').append('<img src="'+ ux.core.resourcePath + '/images/loading.gif" />');
					jQuery('<p></p>').appendTo('#loading-div');
					jQuery('#loading-div p').append( displayText );
					
				
					// Scroll user to appropriate position
					jQuery('html, body').animate({ scrollTop: scrollTo }, 'fast'); 
				}
	
				// This function is responsible for removing classes.
				function remove_modal() {
					jQuery('#modal-div').remove();
					jQuery('#modal-background').remove();
				}
				
				/*
				 * Adds the missing required modal parts
				 */
				
				if (!jQuery('.ux-preload-wrapper').length) {
					jQuery('<div></div>').appendTo('body')
						.addClass('ux-preload-wrapper')
						.attr('id', 'preload');	
					
					function preload(arrayOfImages) {     
						jQuery(arrayOfImages).each(function(){
							jQuery('<img alt="preload image"/>').appendTo('#preload').attr('src',this);
					}); }
					
					preload([     
							 ux.core.resourcePath + '/images/loading.gif'
					]); 
				
				}
				
				// Bind event to any .processing class
				jQuery('.processing').click(function(){
					modal_loader( 'Processing Request' );
					return true;
				});
				
			},
			isLoaded: false
		},
		placeHolder: {
			defaultFunction: function() {
				jQuery('[class^="ux-attribute"]').each(function() {
					shim = (jQuery(this).attr('class')).replace(/ /g, ':').replace(/_/g, ' ').split(':');
					jQuery(this).attr(shim[1], shim[2]);
				});	

				// Non HTML5 Polyfill
				if (!Modernizr.input.placeholder) {

					jQuery('[placeholder]').focus(function() {
						var input = jQuery(this);
						if (input.val() === input.attr('placeholder')) {
							input.val('');
							input.removeClass('ux-placeholder');
							if(document.all) { input.get(0).createTextRange().select(); }; //test for IE, add blinking cursor
						}
					}).blur(function() {
						var input = jQuery(this);
						if (input.val() === '') {
							input.addClass('ux-placeholder');
							input.val(input.attr('placeholder'));
						} else if ( input.val() === input.attr('placeholder') ) {
							input.addClass('ux-placeholder');
						} else {
							input.removeClass('ux-placeholder');
						}
					}).change( function() {
						var input = jQuery(this);
						if ( input.hasClass('ux-placeholder') ){
							 input.removeClass('ux-placeholder');
						}
						input.focus();
					}).blur();
					
					jQuery('[placeholder]').parents('form').submit(function() {
						jQuery(this).find('[placeholder]').each(function() {
							var input = jQuery(this);
							if (input.val() === input.attr('placeholder')) {
								input.val('');
							}
						});
					});

				}
			},
			isLoaded: false
		},
		/*
		 * Function used for setting up client side translate.
		 */
		translate: {
			dependencies: "notifications",
			defaultFunction: function() {
				jQuery('.ux-translate-trigger').click(function() {
					jQuery(this).uxNotice({
						title: "Select Language",
						message: jQuery('#ux-translate-container' ).html(),
						type: "Required"
					});
				});
			},
			isLoaded: false
		},
		/*
		 * Function used to add the expandable table row ability
		 * Arguments: None
		 */
		tableExpandables: {
			defaultFunction: function() {
				jQuery('tr.expandable ~ tr.expandable-child').hide();
				jQuery('tr.expandable .icon').prepend('<a class="table-expandable-icon contracted" href="#"><img src="'+ ux.core.resourcePath +'/images/background-navigation-expandable-right.gif" alt="show rows"></a>');
				
				jQuery('tr.expandable .icon .contracted').live('click', function(){
					jQuery(this).removeClass('contracted').addClass('expanded').children().attr('src', ux.core.resourcePath +'/images/background-navigation-expandable-down.gif').attr('alt', 'hide rows');
					jQuery(this).parent().parent().nextAll('.expandable-child').show();
					return false;
				});
				jQuery('tr.expandable .icon .expanded').live('click', function(){
					jQuery(this).removeClass('expanded').addClass('contracted').children().attr('src', ux.core.resourcePath +'/images/background-navigation-expandable-right.gif').attr('alt', 'show rows');
					jQuery(this).parent().parent().nextAll('.expandable-child').hide();
					return false;
				});
				
				jQuery('input:disabled').addClass('disabled');  // Input.disabled setup - if dynaically disabled/enabled, call inputDisabledStyle()
				jQuery('.disabled-link').click(function(){ return false; });
			},
			isLoaded: false
		},
		/*
		 * Link Icons
		 */
		linkIcons: {
			defaultFunction : function() {
		
				/*
				 * Function is used to compare doc type and classes and if found returns a 
				 */
				function docDemo(doc) {
					switch(doc) {
						case "doc": 
						case "docx": 
						case "ux-link-icon-word":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_word.png",
						   		alt: "Microsoft Office Word Document"
						   };
						case "xls": 
						case "xlsx": 
						case "ux-link-icon-excel":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_excel.png",
						   		alt: "Microsoft Office Excel Document"
						   };
						case "ppt": 
						case "pptx": 
						case "ux-link-icon-power-point":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_powerpoint.png",
						   		alt: "Microsoft Office Power Point Document"
						   };
						case "pdf": 
						case "ux-link-icon-pdf":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_acrobat.png",
						   		alt: "Adobe PDF File"
						   };
						case "zip": 
						case "ux-link-icon-zip":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_compressed.png",
						   		alt: "Compressed File"
						   };
						case "rtf": 
						case "txt": 
						case "ux-link-icon-text":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/page_white_text.png",
						   		alt: "Text File"
						   };
						case "ux-link-icon-new-window":
						   return {
							   icon : ux.core.resourcePath + "/images/icons/new-window.png",
						   		alt: "Opens in a new window"
						   };
					}
				}
				
				// Simple check to make sure we already have are traversed elements saved off.
				if(ux.dom.uxPageAnchors) {

					// Static variables
					var uxLinkIcon_fileType = /(?:\.([^.]+))?$/;
					var uxLinkIcon_mail = /mailto/;
					var supportedDocTypes = ["doc","docx","xls","xlsx","ppt","pptx","pdf","zip","rtf","txt"];
					var supportedDocClasses = ["ux-link-icon-word",
					                           "ux-link-icon-excel",
					                           "ux-link-icon-power-point",
					                           "ux-link-icon-pdf",
					                           "ux-link-icon-zip",
					                           "ux-link-icon-text",
					                           "ux-link-icon-new-window"];
					
					// Loop through ever link item
					jQuery.each(ux.dom.uxPageAnchors, function(i){
						
						// Save off the current link into a temp variable
						var thisObjOrig = jQuery(this);
						var thisObj = thisObjOrig.clone();
						
						// Test to skip all tags that are marked with the .ux-no-link-icon class
						if (!thisObj.hasClass('ux-no-link-icon')) {
							
							// variables needed for the process.
							var uxLink = thisObj.attr('href');
							var uxTarget = thisObj.attr('target');
							
							// Test result holder
							var testResults = {
								document: false,
								external: false,
								mail: false,
								docDemo: {} // Additional demographics used if the link turns out to be a document link
							}
							
							// First check if this is a mail link, if it is we know we can rule everything else out.
							if (uxLinkIcon_mail.test(uxLink)){
								
								testResults.mail = true;
								
							} else {
							
								// Get the links url and see if we can slice an extention out of it.
								var ext = uxLinkIcon_fileType.exec(uxLink)[1];
								
								// Check to see if the link has a know doc type in the url
								if(jQuery.inArray(ext, supportedDocTypes ) > -1){
									
									// Save the info for later
									testResults.document = true;
									jQuery.extend(testResults.docDemo,docDemo(ext));
								} 
								// Check to see if this is an anchor that is manually requesting the link icon to be added
								else if (thisObj.hasClass('ux-add-link-icon')) {
									
									// pull all the classes into an array
									var classes = thisObj.attr('class').split(' ');
									
									// Loop through each classes looking for a known document type
									for(i=0,c=classes.length;i<c; i++) {
										if(jQuery.inArray(classes[i], supportedDocClasses ) > -1) {
											
											// Save the info for later
											testResults.document = true;
											jQuery.extend(testResults.docDemo,docDemo(classes[i]));
											break;
										}
									}	
								}
								
								// Test to see if the link goes to an external site
								testResults.external = ((uxTarget == "blank") || (uxTarget == "_blank")) ? true : false;
							}

							// Call the procedure for setting up linkIcons if needed
							if (testResults.mail || testResults.document || testResults.external) {

								// Preset variables.
								var textWrapper = jQuery('<span class="icon-link-text"></span>' );
								var imgWrapper = jQuery('<span class="icon-link-span"></span>');
								var anchorClasses = "link-icon";
								var altText = "", iconPath = "", icon = "";
				
								// Test to see if its a mail link, if so we can do just a mail setu otherwise we need to test document and external.
								if (testResults.mail) {
									anchorClasses += " email-link";
									altText = "Email Contract Address";
									iconPath =  ux.core.resourcePath + "/images/icons/inline_email.png",
									icon += '<img alt="' + altText + '" class="icon-link-span-icons" src="' + iconPath + '" />';
								} else {
				
									// Document Icon should appear first
									if (testResults.document) {
										anchorClasses += " doc-link";
										altText = testResults.docDemo.alt;
										iconPath =  testResults.docDemo.icon;
										icon += '<img alt="' + altText + '" class="icon-link-span-icons" src="' + iconPath + '" />';
									}
				
									// Check to see if the link is to an external location
									if (testResults.external) {
										anchorClasses += " new-win-link";
										altText = "Opens in a new window";
										iconPath =  ux.core.resourcePath + "/images/icons/new-window.png",
										icon += '<img alt="' + altText + '" class="icon-link-span-icons" src="' + iconPath + '" />';
									}
								}
				
								// Add images to the wrapper.
								imgWrapper.append(icon);
				
								// Add a few key classes to the anchor
								// Wrap text with textWrapper
								// Add image icon span link
								// Fix text if needed
								thisObj.append(imgWrapper)
								   .wrapInner(textWrapper)
								   .addClass(anchorClasses);
								
								thisObjOrig.replaceWith(thisObj);
								
							}
						}
					});
				}
			},
			isLoaded: false
		}
	}

}

function switch_selected(newSelection) {
	jQuery('.ux-a-z-index a.selected').removeClass('selected');
	jQuery('.ux-a-z-item-container.selected').fadeOut('fast', function() {
		jQuery(this).removeClass('selected');
		jQuery('#' + newSelection + '-index').addClass('selected');
		jQuery('#' + newSelection + '-container').fadeIn('fast', function() {
			jQuery(this).addClass('selected');
		});
	});
}

function inputDisabledStyle(){
	jQuery('input:disabled').addClass('disabled');
	jQuery('input:enabled').removeClass('disabled');
}