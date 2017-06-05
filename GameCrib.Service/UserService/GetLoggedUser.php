<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/base.php");
	include($dir."/DataAccess/user_dao.php");
	include($dir."/DataAccess/app_dao.php");

	$data = toObject($_POST);

	$facebook_id = $data['facebook_id'];
	
	// get the user password for GameSparks
	$result = TryQuerry($conn, user_getPassword($facebook_id));

	if (mysqli_num_rows($result) < 1) {

		// We need to add a password to this chap.
		TryQuerry($conn, user_setPassword(generatePassword(10), $facebook_id));
	}

	//	Get the user only if its allready logged in and not more then 1 hour passed since last active.
	$userId;
	$user;

	$result = TryQuerry($conn, user_getUser("", $facebook_id, true));
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$user = FillUser($row);
			$userId = $row['ID'];
		}
	}

	$result = TryQuerry($conn, app_getUserApps($userId));
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$user['Apps'][] = $row;
		}
	}

	$result = TryQuerry($conn, user_getFriends($userId));
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$user['Friends'][] = $row;
		}
	}

	# JSON-encode the response
	echo $json_response = json_encode($user);
?>