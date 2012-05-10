<?php

	// Include mobile esp for now. WURFL would be better but we might need to get a licence for use.
	include("mdetect.php");

	// Get user agent information
	$uagent_obj = new uagent_info();


	/*
	* Check to see if the device appear to be smartphone or older internet based phone
	* We are leaving tablet size devices out of the loop for the momment as jQuery mobile is truly for mobile phones.
	*/

	if (($uagent_obj->isTierIphone == $uagent_obj->true) || ($uagent_obj->DetectMobileQuick() == $uagent_obj->true)) {
		header ('Location: '."index-mobile.html");
	} else {
		// It is some what safe to assume thi is a regular desktop.
		header ('Location: '."index-desktop.html");
	}

?>