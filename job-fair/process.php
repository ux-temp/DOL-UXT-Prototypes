<?php

	// Check to see if the robot feild was filled in
	if (empty($_POST['robot'])) {

		// Declare all of the variables needed and set them all to null or false by default.
		$fname = $lname = $ssn = $email = $ageRange = $gender = $veteran = $unemployed = $event = $education = null;

		$tradeAgricultureal = $tradeConstruction = $tradeEducation = $tradeFinancialService = $tradeFoodService = $tradeHealthService = $tradeInfoTech = $tradeLeisureHosp = $tradeManufacturing = $tradeNaturalResourceMining = $tradeProfessionalBusiness = $tradePublicAdmin = $tradeSales = $tradeSecurityMilitary = $tradeSocialService = $tradeTradeTransportUtilities = false;
		

		// Loop through all of the different post values and update teh values accordingly.
		while (list($key,$value) = each($_POST)){
			echo "Key: ".$key . " Value: ".$value."<br />";

			// Using the key get the correct variable and update its value.
			${$key} = $value;

		}

		// See if we can connect to the database.
		

	}

	print('<br><br>Processed! ' . $fname);
?>