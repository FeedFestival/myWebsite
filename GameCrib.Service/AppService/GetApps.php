<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/base.php");
	include($dir."/DataAccess/app_dao.php");
	
	// echo $_SERVER['DOCUMENT_ROOT'];
	// echo $_SERVER['HTTP_HOST'];
	
	$result = TryQuerry($conn, app_getApps());
	
	$arr = array();
	
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$arr[] = $row;
		}
	}
	# JSON-encode the response
	echo $json_response = json_encode($arr);
?>