// OTHER FUNCTIONS
// ==================================================================================

// Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'google_translate_element');
 addGoogleTranslateDisclaimer();
}

function addGoogleTranslateDisclaimer() {
	$('.goog-te-gadget span').remove();
	var google_dropdown = $('.goog-te-gadget').children('div');
	$('.goog-te-gadget').html(google_dropdown);
	$('<p><a href="http://www.labor.ny.gov/google-disclaimer.shtm">Disclaimer</a></p>').appendTo('.goog-te-gadget');
}

// UX NOTIFICATION PLUGIN
// ==================================================================================
(function($) {
	
	$.fn.extend({ 
		// Create Notifications
		uxNotice: function(options) {
			
			// Defualt Settings.
			var defaults = {
				title: "TITLE",
				message: "MESSAGE",
				location: "#ux-generic-notifications",
				rollUpTimer: true,
				outTimer: 5000,
				type: 'basic',
				special: 'none',
				ariaLive: 'polite',
				ariaAtomic: 'false',
				ariaDescribedBy: 'notification'
				//option: 'value'
					//singleton : false //TODO: revisit me 
			};
			
			// Permit Overriding.
			var options = $.extend(defaults, options);
			
			if ($('body.ie6').length == 0) {
				
			// Variables.
			if (options.type == 'basic') {
				var noticeItem = jQuery('<div></div>')
					.addClass('ux-notice').attr({'aria-live':options.ariaLive, 'aria-atomic': options.ariaAtomic, 'aria-describedby': options.ariaDescribedBy, 'role': options.ariaDescribedBy})
					.appendTo(options.location);
				var noticeItemClose = jQuery('<img src="' + uxVar.core.resourcePath + '/images/icons/notice-close.png" alt="Close Notification" />')
					.addClass('ux-notice-close')
					.appendTo(noticeItem)
					.click(function() { $(this).uxNoticeRemoval(noticeItem)});
				var noticeContents = jQuery('<div></div>')
					.html('<h3>' + options.title + '</h3><p>' + options.message + '</p>')
					.appendTo(noticeItem);
				
				// Automatically role up the alert after the passed outTimer
				if(options.rollUpTimer)
				{
					setTimeout(function()
					{
						$(this).uxNoticeRemoval(noticeItem);
					},
					options.outTimer);
				}

			} else {
				
				// Force all special items to go into the required actions section
				options.location = '#ux-action-required-notifications';
				var tray = ".arn-tray";
				
				// Test to see if the require notification window is shown, if not open it.
				if ($(options.location).css('display') == 'none') {
					$(options.location).fadeIn();
				}
				
				if (options.special != 'gtranslate') {
					
					// Add the new notification item. We dont have an outside because all required notifications fall inside of the arn-tray.
					var noticeItem = jQuery('<div></div>')
						.addClass('ux-notice')
						.attr({'aria-live':options.ariaLive, 'aria-atomic': options.ariaAtomic, 'aria-describedby': options.ariaDescribedBy, 'role': options.ariaDescribedBy})
						.appendTo(options.location + ' ' + tray);
					var noticeItemClose = jQuery('<img src="' + uxVar.core.resourcePath + '/images/icons/notice-close.png" alt="Close Notification" />')
						.addClass('ux-notice-close')
						.appendTo(noticeItem).click(function() { $(this).uxNoticeRemoval(noticeItem)});
					var noticeContents = jQuery('<div></div>')
						.html('<h3>' + options.title + '</h3><p>' + options.message + '</p>')
						.appendTo(noticeItem);
						
				} else if(options.special == 'gtranslate') {
					
					/* The only way to continually allow google translate to dynamically load is by getting the script each time, so this logic
					prevents more than one google translate form being open at a time. */
					
					options.title = "Translate:";
					
					if ($('#google_translate_element').length == 0) {
						
						// Add the google translate notification
						var noticeItem = $('<div></div>')
							.addClass('ux-notice')
							.attr({'aria-live':options.ariaLive, 'aria-atomic': options.ariaAtomic, 'aria-describedby': options.ariaDescribedBy, 'role': options.ariaDescribedBy})
							.appendTo(options.location + ' ' + tray);
						var noticeItemClose = jQuery('<img src="' + uxVar.core.resourcePath + '/images/icons/notice-close.png" alt="Close Notification" />')
							.addClass('ux-notice-close')
							.appendTo(noticeItem)
							.click(function() { $(this).uxNoticeRemoval(noticeItem)});
						var noticeContents = jQuery('<div></div>')
							.html('<h3>' + options.title + '</h3><div id="google_translate_element"></div>')
							.appendTo(noticeItem);
						
						// Check to see if we need to get google translate.
						$.getScript('http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', function() {
						});
						
					}
					
				}
				
			}
			
			}
		},
		
		// Remove Notifications.
		uxNoticeRemoval: function(object) {
				object.fadeOut(1000, function()
				{
					object.remove();
					
					// Check to see if we need to hide the required area.
					if ($('#ux-action-required-notifications .arn-tray').children().length == 0) {
						$('#ux-action-required-notifications').hide();
					}
				});
		}
	});
	
})(jQuery);