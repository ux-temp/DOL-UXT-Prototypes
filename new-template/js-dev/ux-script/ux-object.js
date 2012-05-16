/*
 * UX variable object
 * 
 * Used to hold variables important to the ux framework as well as 
 * key functions and state information that have been stored here for 
 * lazy loading for optimal use.
 */
var uxVar = {
	ver: "v.0.5.0",
	core: {
		browser: "",
		protocol: "",
		jsExt: ".js",
		jsPath: "js-dev/",
		resourcePath: "/UX-Prototype/new-template/"
	},
	init: {
		// Special variable used to flag is specific items should load by default or not.
		navOutWarning: false
	},
	features: {
		// List of all scripts built into and accepted by the UX framework.
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
					trigger.prepend( '<img src="' + uxVar.core.resourcePath +'/images/icons/add.png" class="ux-jQDT-row-expand-img">' )
					jQuery(this).find('.ux-jQDT-row-expand-content').hide();
				});
				
				// Add function for DataTables Expandables
				function jQDTExpand_FormatDetails ( targetDiv )
				{
					var expandData = targetDiv.html();
					var sOut = '<div class="ux-jQDT-row-expanded-content">' + expandData + '</div>';
					return sOut;
				}
				
				var jQDTExpand_icon_closed = uxVar.core.resourcePath + "/images/icons/add.png";
				var jQDTExpand_icon_opened = uxVar.core.resourcePath + "/images/icons/delete.png";
				 
				jQuery('a.ux-jQDT-row-expand-trigger').on('click', function () {	
					var thisTr = jQuery(this).closest( 'tr' );
					var nTr = thisTr[0]; //needed this "[0]" to pass 'this' instead of $(this)

					var targetDiv = jQuery(this).next('.ux-jQDT-row-expand-content');
					var oTable = jQuery(this).closest( 'table.data-table' ).dataTable( { "bRetrieve" : true } ) ; // get data-table
					var trig_img = jQuery(this).find('img.ux-jQDT-row-expand-img')[0];
					
					if ( trig_img.src.match( jQDTExpand_icon_opened ) ) {
						// This row is already open - close it 
						trig_img.src = jQDTExpand_icon_closed;
						oTable.fnClose( nTr );
					} else {
						// close all expands in this row 
						$(thisTr).find( 'a.ux-jQDT-row-expand-trigger' ).each( function (){
							jQuery(this).find('img.ux-jQDT-row-expand-img')[0].src = jQDTExpand_icon_closed;
						});	oTable.fnClose( nTr );
					
						// then open this expand 
						trig_img.src = jQDTExpand_icon_opened;
						oTable.fnOpen( nTr, jQDTExpand_FormatDetails(targetDiv), 'ux-jQDT-row-expanded' );
					}
					
					return false; // don't send the AHREF
				});

				// Apply our own defaults
				jQuery.extend( $.fn.dataTable.defaults,this.defaultSettings);
				
				// Setup the default implementation of dataTables.
				jQuery(this.defaultElement).dataTable();
				
			},
			loadStatus: false
		},
		jqueryUI: {
			script: "jquery-ui-core",
			loadStatus: false
		},
		jqueryTabs: {
			script: "jquery-ui-tabs",
			defaultElement: ".jQTabs",
			defaultSettings: {},
			defaultFunction: function(){
				jQuery(this.defaultElement).tabs(this.defaultSettings);
			},
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryDatePicker: {
			script: "jquery-ui-datepicker",
			defaultElement: ".jQDatePicker",
			defaultSettings: {},
			defaultFunction: function() {
				
				// Overwrite our defaults as the sensible defaults
				jQuery.datepicker.setDefaults( {	
					showAnim: '',
					showOn: "both",
					buttonText: 'Datepicker',
					buttonImage: uxVar.core.resourcePath + "/images/icons/calendar_disabled.png",
					buttonImageOnly: true,
					changeMonth: true,
					changeYear: true
				} );
				
				// Setup Datepicker items
				jQuery( this.defaultElement ).datepicker( this.defaultSettings );   
			},
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryAccordion: {
			// No current default implementation by UX.
			script: "jquery-ui-accordion",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryAutoComplete:{
			// No current default implementation by UX.
			script: "jquery-ui-autocomplete",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryButton: {
			// No current default implementation by UX.
			script: "jquery-ui-button",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryDialog: {
			// No current default implementation by UX.
			script: "jquery-ui-dialog",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jquerySlider: {
			// No current default implementation by UX.
			script: "jquery-ui-slider",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		jqueryProgressBar: {
			// No current default implementation by UX.
			script: "jquery-ui-progressbar",
			dependencies: "jqueryUI", 
			loadStatus: false
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
				jQuery(ux_contexthelpImg).attr( "src", uxVar.core.resourcePath +"images/icons/help.png" );
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
			loadStatus: false
		},
		formEnhancements: {
			script: "jquery.open-ux.form-enhancements",
			defaultElement: ".ux-password-show-hide",
			defaultSettings: {
				type:'button',
				moreClasses:'button_mini no-icon'
			},
			defaultFunction: function() {
				jQuery(this.defaultElement).showHidePass(this.defaultSettings);
			},
			loadStatus: false
		},
		keyboardShortcuts: {
			script: "jquery.open-ux.keyboard-shortcuts",
			dependencies: "jqueryDialog",
			loadStatus: false
		},
		notifications: {
			script: "jquery.open-ux.notifications",
			defaultFunction: function() {

				var noteArea = $('<div>').attr('id','ux-note-area');

				$('body').prepend(noteArea);

			},
			loadStatus: false
		},
		navOutWarning: {
			script: "jquery.open-ux.navigational-warning",
			dependencies: "jqueryDialog",
			defaultSettings: {},
			defaultFunction: function(selector){
				// Some logic to help out the click binding.
				
				if (!selector) {
					// nothing was passes so we are going to assume all links on the page need to have the following click event bound to them.
					ux.domSaver("a","allAnchors");
					selector = uxVar.dom.allAnchors;
				}
				// Just all the jquery plugin with no paramaters.
				$(selector).navOutWarning(this.defaultSettings);
			},
			loadStatus: false
		},
		fullCalendar: {
			script: "jquery.fullcalendar",
			dependencies: "jqueryUI",
			loadStatus: false
		},
		video: {
			script: "video",
			loadStatus: false
		},
		sugar: {
			script: "sugar",
			loadStatus: false
		},
		swfobject: {
			script: "swfobject",
			loadStatus: false
		},
		popover: {
			script: "jquery.open-ux.popovers",
			defaultElement: ".ux-popover",
			defaultFunction: function() {
				$(this.defaultElement).popover();
			},
			loadStatus: false
		},
		textExpander: {
			script: "jquery.expander",
			loadStatus: false
		},
		/*
		 * List of builtin functions that have not or will not be turned into plugin scripts.
		 */
		expandableContent: {
			defaultFunction: function() {
				var root_container = $('.ux-content-expandable');
				var only_one = 0;
				var keep_place = 0;
				
				if (root_container.hasClass('ux-only-one')) {
					only_one = 1;
				}
				if ((root_container.hasClass('ux-keep-place')) && (root_container.hasClass('ux-only-one'))) {
					keep_place = 1;
				}
				
				// Setup pre-open direct links
				var directLink = jQuery.getUrlVar('direct-link');
				
				if ((directLink) && ($('.ux-expandable').length > 0)) {
					if (jQuery('a[name=' + directLink + ']').length == 1) {
						jQuery('a[name=' + directLink + ']').parent().addClass('ux-expanded');
					}
				}	
				
				jQuery('.ux-content-expandable .ux-expandable').each(function() {
					jQuery(this).addClass('ux-remove-bullets');
					// Go out and close all expandable containers by defualt unless expanded is declared.
					if (!jQuery(this).hasClass('ux-expanded')) {
						jQuery(this).children('a[href="#"]:first').addClass('ux-a-expandable').addClass('ux-arrow-open');
						jQuery(this).children('div:first').hide();
					} else {
						jQuery(this).children('a[href="#"]:first').addClass('ux-a-expandable').addClass('ux-arrow-close');
					}
				});
				// Add click event to all links that are expandable.
				jQuery('.ux-content-expandable .ux-expandable a[href="#"]').click(function(e) {
						e.preventDefault();
						// Get some additional info before making a decision.
						if(jQuery(this).hasClass('ux-arrow-open')) {
							// Check to see if we need to close other branches
							if (jQuery(this).closest('.ux-content-expandable').hasClass('ux-only-one')) {
								if (jQuery(this).closest('.ux-content-expandable').hasClass('ux-keep-place')) {
									jQuery(this).closest('ul').children('li.ux-expandable').each(function(i){
										jQuery(this).children('a.ux-arrow-close:first')
											.addClass('ux-arrow-open')
											.removeClass('ux-arrow-close');
										jQuery(this).children('div:first')
											.slideUp();
									});
								} else {
									jQuery(this).closest('ul').find('li.ux-expandable').each(function(i){
										jQuery(this).children('a.ux-arrow-close')
											.addClass('ux-arrow-open')
											.removeClass('ux-arrow-close');
										jQuery(this).children('div:first')
											.slideUp();
									});
								}
							}
							jQuery(this).next('div:first').slideDown();
							jQuery(this).addClass('ux-arrow-close');
							jQuery(this).removeClass('ux-arrow-open');
						} else {
							jQuery(this).next('div:first').slideUp();
							jQuery(this).addClass('ux-arrow-open');
							jQuery(this).removeClass('ux-arrow-close');
						}	
				});
			},
			loadStatus: false
		},
		expandableContainer: {
			defaultFunction: function(){
				if (jQuery('.ux-container-expandable').length > 0){
					jQuery('.ux-container-expandable').each(function(){
						jQuery(this).children('a:first')
							.addClass('ux-expandable-click')
							.click(function(e) {
								e.preventDefault();
								if ($(this).children().hasClass('ux-expanded')) {
									jQuery(this).children().removeClass('ux-expanded');
									jQuery(this).next('div:first').slideUp();
								} else {
									jQuery(this).children().addClass('ux-expanded');
									jQuery(this).next('div:first').slideDown();
								}
							})
							.children().addClass('ux-expandable-header');
						
						if (jQuery(this).hasClass('ux-closed')) {
							jQuery(this).children('div:first').hide();
						} else {
							jQuery(this).children('a:first').children().addClass('ux-expanded');
						}
						
					});
				}
			},
			loadStatus: false
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
						.css({'width':$(document).width(),'height':jQuery(document).height()});	
						
					// Create a new popup window.
					jQuery('<div></div>').appendTo('body')
						.attr('id','modal-div')
						.css({'top':posTop,'left':(($(window).width() / 2) - (jQuery('#modal-div').width() / 2))});
						
					// Create the mediaspace area in new-player-modal.
					jQuery('<div></div>').appendTo('#modal-div')
						.attr('id','loading-div');
					
					jQuery('#loading-div').append('<img src="'+ uxVar.core.resourcePath + '/images/loading.gif" />');
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
							 uxVar.core.resourcePath + '/images/loading.gif'
					]); 
				
				}
				
				// Bind event to any .processing class
				jQuery('.processing').click(function(){
					modal_loader( 'Processing Request' );
					return true;
				});
				
			},
			loadStatus: false
		},
		placeHolder: {
			defaultFunction: function() {
				$('[class^="ux-attribute"]').each(function() {
					$shim = ($(this).attr('class')).replace(/ /g, ':').replace(/_/g, ' ').split(':');
					$(this).attr($shim[1], $shim[2]);
				});	

				// Non HTML5 Polyfill
				if (!Modernizr.input.placeholder) {

					$('[placeholder]').focus(function() {
						var input = $(this);
						if (input.val() === input.attr('placeholder')) {
							input.val('');
							input.removeClass('ux-placeholder');
							if(document.all) { input.get(0).createTextRange().select(); }; //test for IE, add blinking cursor
						}
					}).blur(function() {
						var input = $(this);
						if (input.val() === '') {
							input.addClass('ux-placeholder');
							input.val(input.attr('placeholder'));
						} else if ( input.val() === input.attr('placeholder') ) {
							input.addClass('ux-placeholder');
						} else {
							input.removeClass('ux-placeholder');
						}
					}).change( function() {
						var input = $(this);
						if ( input.hasClass('ux-placeholder') ){
							 input.removeClass('ux-placeholder');
						}
						input.focus();
					}).blur();
					
					$('[placeholder]').parents('form').submit(function() {
						$(this).find('[placeholder]').each(function() {
							var input = $(this);
							if (input.val() === input.attr('placeholder')) {
								input.val('');
							}
						});
					});

				}
			},
			loadStatus: false
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
			loadStatus: false
		},
		/*
		 * Function used to add the expandable table row ability
		 * Arguments: None
		 */
		tableExpandables: {
			defaultFunction: function() {
				jQuery('tr.expandable ~ tr.expandable-child').hide();
				jQuery('tr.expandable .icon').prepend('<a class="table-expandable-icon contracted" href="#"><img src="'+ uxVar.core.resourcePath +'/images/background-navigation-expandable-right.gif" alt="show rows"></a>');
				
				jQuery('tr.expandable .icon .contracted').live('click', function(){
					jQuery(this).removeClass('contracted').addClass('expanded').children().attr('src', uxVar.core.resourcePath +'/images/background-navigation-expandable-down.gif').attr('alt', 'hide rows');
					jQuery(this).parent().parent().nextAll('.expandable-child').show();
					return false;
				});
				jQuery('tr.expandable .icon .expanded').live('click', function(){
					jQuery(this).removeClass('expanded').addClass('contracted').children().attr('src', uxVar.core.resourcePath +'/images/background-navigation-expandable-right.gif').attr('alt', 'show rows');
					jQuery(this).parent().parent().nextAll('.expandable-child').hide();
					return false;
				});
				
				jQuery('input:disabled').addClass('disabled');  // Input.disabled setup - if dynaically disabled/enabled, call inputDisabledStyle()
				jQuery('.disabled-link').click(function(){ return false; });
			},
			loadStatus: false
		},
		/*
		 * Function for side navigation with additional logic to prevent running/full searching the DOM.
		 * Arguments: None
		 */
		sideNavs: {
			defaultFunction: function(){
				jQuery('#ux-side-nav .expandable').addClass('contracted').next().hide();
				jQuery('#ux-side-nav .expanded').removeClass('contracted').next().show();
				jQuery('#ux-side-nav .contracted').live('click', function(){  // .live enables handlers to lazily attached to elements that may not yet exist
					jQuery(this).removeClass('contracted').addClass('expanded').next().slideDown();
					return false;
				});
				
				jQuery('#ux-side-nav .expanded').live('click', function(){
					jQuery(this).removeClass('expanded').addClass('contracted').next().css("display", "block").slideUp();
					return false;
				});
			},
			loadStatus: false
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
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_word.png",
							   		alt: "Microsoft Office Word Document"
							   };
							case "xls": 
							case "xlsx": 
							case "ux-link-icon-excel":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_excel.png",
							   		alt: "Microsoft Office Excel Document"
							   };
							case "ppt": 
							case "pptx": 
							case "ux-link-icon-power-point":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_powerpoint.png",
							   		alt: "Microsoft Office Power Point Document"
							   };
							case "pdf": 
							case "ux-link-icon-pdf":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_acrobat.png",
							   		alt: "Adobe PDF File"
							   };
							case "zip": 
							case "ux-link-icon-zip":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_compressed.png",
							   		alt: "Compressed File"
							   };
							case "rtf": 
							case "txt": 
							case "ux-link-icon-text":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/page_white_text.png",
							   		alt: "Text File"
							   };
							case "ux-link-icon-new-window":
							   return {
								   icon : uxVar.core.resourcePath + "/images/icons/new-window.png",
							   		alt: "Opens in a new window"
							   };
						}
					}
					
					// Simple check to make sure we already have are traversed elements saved off.
					if(uxVar.dom.pageAnchors) {
						
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
						jQuery.each(uxVar.dom.pageAnchors, function(i){
							
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
										$.extend(testResults.docDemo,docDemo(ext));
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
												$.extend(testResults.docDemo,docDemo(classes[i]));
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
										iconPath =  uxVar.core.resourcePath + "/images/icons/inline_email.png",
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
											iconPath =  uxVar.core.resourcePath + "/images/icons/new-window.png",
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
				loadStatus: false
			}
	},
	// Special storage location for everything pulled from the dom that we would want to save
	dom: {}
};

/*
 * UX Functionality API
 */
var ux = {
	/*
	 * Function used to call for the lazy loading of scripts and internal functionaility
	 * it is the nicer way to call for functions and scripts as short and to the point.
	 * most of the programming logic is done in ux.loader where each request will be send in as a string.
	 *
	 * Argument:
	 * 	- request: 	String/Array (Name of scripts/fucntions to be loaded)
	 *  - callback: Function (OPTIONAL - Callback function for executing of script after external script of funtion is loaded)
	 */
	load: function(request, callback) {
		var type;
		
		// Check to see if the request is a string or a array
		if (typeof(request) == "string") {
		
			// Simple check to see if the request item is a feature we lazy load/run and if it is, if it has not been loaded.
			if ((uxVar.features.hasOwnProperty(request)) && (!uxVar.features[request].loadStatus)) {
				this.loader(request, callback);
			}
		
		} else if (request instanceof Array) {
		
			// Loop through each item seperately.
			for (var i=0, req = request.length; i < req; i++) {
				
				// Simple check to see if the request item is a feature we lazy load/run and if it is, if it has not been loaded.
				if (uxVar.features.hasOwnProperty(request[i]) && (!uxVar.features[request[i]].loadStatus)) {
					this.loader(request[i], callback);
				}
				
			}
		
		}
	},
	/*
	 * Function is the true loader and has most of the logic used to determine what it needes to load.
	 *
	 * Argument:
	 * 	- request: 	String (Name of scripts/fucntions to be loaded)
	 *  - callback: Function (OPTIONAL - Callback function for executing of script after external script of funtion is loaded)
	 */
	loader: function(request, callback) {
		// Since we know what we are working with at this point all we need to do determine is if its a script or fucntion.
		// all lazy loaded scripts have the additional propertiy of "script" where functions do not. This is a good determineing point.
		
		// Check to see if the requested item has dependents
		if (uxVar.features[request].hasOwnProperty('dependencies')) {
			
			// We have at least one dependency
			var dependents = uxVar.features[request].dependencies;
			
			if (typeof(dependents) == "string") {
				
				// Check the loaded state of the dependent
				if (!uxVar.features[dependents].loadStatus) {
					
					//Call the loader for the dependent
					this.load(dependents);
				}
				
			} else {
				// We know this is going to be an array since UX Team controls this structure.
				for (var i=0, dep = dependents.length; i < dep; i++) {
				
					// Check the loaded state of the dependent
					if (!uxVar.features[dependents[i]].loadStatus) {
						
						//Call the loader for the dependent
						this.load(dependents[i]);
					}
				
				}
			}
		}
		
		// determine if we are working with a script or functions
		if (uxVar.features[request].hasOwnProperty('script')) {

			// Lazy load the file
			LazyLoad.js( uxVar.core.resourcePath + uxVar.core.jsPath + uxVar.features[request].script + uxVar.core.jsExt , function () {
				// If the default function is listed in the script setting run it!
				if (uxVar.features[request].hasOwnProperty("defaultFunction")){
					uxVar.features[request].defaultFunction();
				}
				
				
				// If a callback function was passed, run it
				if(typeof(callback) == "function"){
					callback();
				}
				
				// Mark this script as being loaded.
				uxVar.features[request].loadStatus = true;
				
			});
	 
		} else {
			// We are working with a function. So just load defaultFunctions.
			uxVar.features[request].defaultFunction();
			
			// Mark this function as being loaded.
			uxVar.features[request].loadStatus = true;
		}
	},
	/*
	 * Function is used to save dom crawls into the uxVar object.
	 *
	 * Argument:
	 * - searchItem: string of the jquery selector we are searching for.
	 * - searchName: string used of the named search.
	 */
	domSaver: function(searchItem, searchName) {
		// Simply adds the items to the uxVar.dom object space.
		uxVar.dom[searchName]= jQuery(searchItem);
	},
	/*
	 * Used to initiate all the basic requirements of ux.
	 * Arguments: None
	 */
	reqLoader: function(){
		// Temp variables
		var temp;
		
		
		/*****
		 * Jquery Additions
		 ******/
		// Add the getUrlVars and getUrlVar functions to jQuert
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
		
		// Add support for jQuery to determine the difference between safari and chrome.
		jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

		/*****
		 * Determine the current protocol and resource path.
		 ******/
		uxVar.core.protocol = location.protocol;
		
		/*****
		 * Determine the browser being used a add the class to the page (CSS Fixes).
		 ******/
		if(jQuery.browser.chrome) {
			temp = "chrome";
		} else if (jQuery.browser.safari) {	
			temp = "safari";
		} else if (jQuery.browser.mozilla) {
			temp = "firefox";
		} else if(jQuery.browser.opera){
			temp = "opera";
		} else {
			temp = "ie";
		}
		
		// See the final version.
		uxVar.core.browser = temp;
		
		// Add browser class
		jQuery('body').addClass(temp);
		
		/*****
		 * CSS Fixes
		 ******/
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
		
		if (temp == "ie") {
			if (jQuery('body').hasClass('ie7')) {
				jQuery('.ie7 tfoot tr:last-child').addClass('last-child');
				jQuery('.ie7 .ux-wizard li:last-child').addClass('last-child');
			}
		}
		
		/*****
		 * Fix tab focus items.
		 ******/
		if (temp == "chrome" || temp == "safari" || temp == "opera") {
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
		
		/*
		 * Load the side nav only if needed.
		 */
		if (jQuery('#ux-side-nav').length > 0) {
			this.load("sideNavs");
		}
		 
		/*
		 * Load the placeholders functions
		 */
		 this.load("placeHolder");

		 if(jQuery('#gov-bar')) {
		 	$('#gov-link3').on('click', function(){
		 		// Hide the parent div
		 		$(this).hide();
		 		$('#gov-search-form').show();
		 		$('#gov-search-box').focus();
		 	})
		 }
		 
		/*
		 * Load A - Z indexing only if needed
		 */
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
		/*
		 * Saves of an array that can be used later for any process that needs to affect all links on the page.
		 * We do this by default because a lot of our internal functions need to traverse these links.
		 */
		this.domSaver('#ux-body a, #ux-footer a',"pageAnchors");
		/*
		 * Run linkIcons
		 */
		this.load("linkIcons");
		
		/*
		 * Default Load Qtip
		 */
		this.load("qtip");

		/*
		 * Default load popover
		 */
		this.load("popovers");
	}
};

/*
 * 
 * Misfit functions.... pulled over for now for good placement. Possible for future re-writes
 * 
 */

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
