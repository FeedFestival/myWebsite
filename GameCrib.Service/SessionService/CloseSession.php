<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/base.php");
	include($dir."/DataAccess/session_dao.php");

	$data = $_POST['data'];

	$result = TryQuerry($conn, session_closeSession("", $data['user_id']));

	$_SESSION['sessionId'] = null;

	http_response_code(200);
	echo json_encode(
		array('message' => "Success")
	);
?>