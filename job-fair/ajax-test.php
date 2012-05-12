<?php
	$data = $_POST['name'];

	// Get a uniqid for the session then md5hash it for optimal uniqness.
	$random_hash = substr(md5(uniqid(rand(), true)), 0, 6);

	echo $random_hash;
?>