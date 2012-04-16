// 
//  jsf.js
//  GUI Foundation
//  
//	For use with User Experience Template. This javascript file modifies JSF generated components to fit with the User Experience Styles.
//	need not include this javascript file unless you are using a project using JSF.
//


// JSF Dialogue Boxes hook
	var jsfDiaBox_NumberOfBoxes = 0;
	var jsfDiaBox_NumberOfRetries = 0; // counter for number of tries for adding the classes to all generated boxes.
	var jsfDiaBox_MaxRetries = 5;
	var jsfDiaBox_BGClassString = "modal-background";
	var jsfDiaBox_HookClassString = ".jsf-dialog-trigger"; // needs leading period
	
	function jsfDiaBox_addtoDialogueBoxBG() {
		// for each generated dialogue boxes, add class
		var foundCounter = 0;
		
		// somereason this gets inserted by jsf
		$("body > div[id^='HX_SCRATCH_']").each( function(){
			$(this).find('textarea').attr('style', 'display: none' ); 
		});
		
		$("body > div[id^='HX_DLG_SCRATCH_']").each( function(){
			$(this).removeAttr('style'); // cleanup jsf inline styles
			
			//alert( foundCounter + " " + $(this).attr('id'));
			var thisClass = $(this).attr('class');
			//if $this.class does not contain the jsfDiaBox_BGClassString, add jsfDiaBox_BGClassString to $this
			if ( thisClass && thisClass.indexOf( jsfDiaBox_BGClassString ) != -1) { 
				// if thisClass is not undef && contains jsfDiaBox_BGClassString
				foundCounter++;
			} else {
				$(this).addClass( jsfDiaBox_BGClassString ); // add class to $this
				// else
				foundCounter++;
			}
		});
		//alert( foundCounter + " " + jsfDiaBox_NumberOfBoxes + " " + jsfDiaBox_NumberOfRetries );
		if ( foundCounter < jsfDiaBox_NumberOfBoxes ) {
		// not foundCounter >= all dialogue Boxes 
			// see if reached the max retries
			if (jsfDiaBox_NumberOfRetries < jsfDiaBox_MaxRetries) {//
			// we haven't reach the max number of retries, 
			// execute again with amount of ms delay ( a bit of recursion here ) 
				jsfDiaBox_NumberOfRetries++; // increment counter for number of tries
				setTimeout( "jsfDiaBox_addtoDialogueBoxBG()" , (jsfDiaBox_NumberOfRetries ^ 2 * 10)  );
			} else {
				jsfDiaBox_NumberOfRetries = 0; // we are done, reset for next time
			}
		}else {
			jsfDiaBox_NumberOfRetries = 0; // we are done, reset for next time
		}
		return true;
	}
	function jsfDiaBox_removeDialogueBoxBG() {
		// this function to fix a bug with using jsf modal + jsf modaless in the same page 
		
		$("body > div[id^='HX_DLG_SCRATCH_']").each( function(){			
			var thisClass = $(this).attr('class');
			if ( thisClass && thisClass.indexOf( jsfDiaBox_BGClassString ) != -1) {
				$(this).removeClass( jsfDiaBox_BGClassString ); 
			}
			
		});
	}
	
	$(document).ready(function(){
		// function to hook onto JSF Dialogue Boxes
		$(jsfDiaBox_HookClassString).click( function() {
			setTimeout( "jsfDiaBox_addtoDialogueBoxBG()" , 5  ); // run first time with delay
		});
		// function counts the number of JSF Dialogue Boxes
		$("div[id^=j_id_jsp_].dol-dialog").each( function() {
			jsfDiaBox_NumberOfBoxes++;
		});
		
		
		// close function
		$( "a[id^=j_id_jsp_]").click( function () {
			setTimeout( "jsfDiaBox_removeDialogueBoxBG()" , 100 ); // fixes a memory leak in IE by running with delay
		});
		
		
	});
// end JSF Dialogue Boxes hook