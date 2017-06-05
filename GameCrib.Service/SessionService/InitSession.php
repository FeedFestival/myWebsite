<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/base.php");
	include($dir."/DataAccess/session_dao.php");

	$data = $_POST['data'];

	TryQuerry($conn, session_closeAllSessions($data['user_id']));
	
	$guid = sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535),
		mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535),
		mt_rand(0, 65535), mt_rand(0, 65535));
	$result = TryQuerry($conn, session_createSession($data['user_id'], $guid));

	$_SESSION['sessionId'] = $guid;

	if (!$result) {
		http_response_code(406);
		echo json_encode(
			array('Error' => "Couldn't create session.")
		);
	} else {
		http_response_code(200);
		echo json_encode(
			array('message' => "Success")
		);
	}
?>