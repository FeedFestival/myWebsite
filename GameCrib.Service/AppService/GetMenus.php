<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/base.php");
	include($dir."/DataAccess/app_dao.php");

	$result;
	if ($_SESSION['sessionId'] && CheckSession($_SESSION['sessionId'], $conn)){
		// if user logged in is admin - 
			//$result = TryQuerry($conn, app_getMenus(true));
		// else
		$result = TryQuerry($conn, app_getMenus());
	} else {
		$_SESSION['sessionId'] = null;
		$result = TryQuerry($conn, app_getMenus());
	}
	
	$arr = array();
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;
		}
	}

	# JSON-encode the response
	echo $json_response = json_encode($arr);
?>