<?php

	// Check to see if the robot feild was filled in
	if (empty($_POST['robot'])) {

		// VARIABLE LOGIC


		// Generate conCode
		$conCode = substr(md5(uniqid(rand(), true)), 0, 6);

		// DATABASE LOCIG
		



	}

	if ($device == "Desktop") {

		header ('Location: '."thank-you-please-email.html");

	} else {

		echo $conCode;

	}
?>