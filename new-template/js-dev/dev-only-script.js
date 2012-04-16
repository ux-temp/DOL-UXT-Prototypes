/*
 * DEVELOPMENT PATH CORRECTION SCRIPT.
 * 
 * This script will change the location of our uxVar.core.jsExt and uxVar.core.jsPath for local ux-development.
 * This script should never be giving to development teams as they do not need to work with non-minified 
 * bleeding edge resources.
 *
 */
 
 // The script that will always be present in dev.
 var devScript = "ux-script/default.js"; // for development
 
 // Check to see if the dev scripts are present.
 if ( jQuery( 'script[src$="'+devScript+'"]' ).length != 0) {
	// Change the extention and folder path accordingly.
	uxVar.core.jsExt = ".js";
	uxVar.core.jsPath = "js-dev/";
 } else {
 	alert('test');
 }
