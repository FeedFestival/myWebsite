<?php
	$dir = $_SERVER['DOCUMENT_ROOT']."/GameCrib.Service";
	include($dir."/utils.php");
	include($dir."/base.php");
	include($dir."/DataAccess/user_dao.php");
	include($dir."/DataAccess/app_dao.php");
	include($dir."/DataAccess/social_dao.php");
	include($dir."/DataAccess/setting_dao.php");
	include($dir."/DataAccess/type_dao.php");

	$data = $_POST['data'];

	// 1 => Check if user exists.

	$user_id = getId(TryQuerry($conn, setting_getColumn("user", "facebook_unique_id", $data['facebook_unique_id'])));
	if ($user_id < 0) {

	// 2 => If it doesnt exit, send a response back so we can create it.

		http_response_code(405);
			echo json_encode(
				array('Error' => "USER_EXIST_NOT")
			);
		exit;
	}

	// 3 => get user
	$user;
	$result = TryQuerry($conn, user_getUser($user_id, "", false));
	if (mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
			$user = FillUser($row);
		}
	}

	// 4 => get user settings

	$result = TryQuerry($conn, setting_getRows('user', 'id', $user_id));
	if (mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
			array_push($user['setting'], FillSetting($row));
		}
	}

	// 5 => get the app -connected

	$result = TryQuerry($conn, app_getApp($data['app_id'], $user_id));
	if (mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc()) {
			$user{"current_app"} = FillApp($row, true);
		}
	}
	
	// 6 => get the user settings for this app

	$result = TryQuerry($conn, setting_getSettingsUnderParent($user['current_app']['setting']['id']));
	if (mysqli_num_rows($result) > 0) {
		$user['current_app']['setting']{'settings'} = array();
		while($row = $result->fetch_assoc()) {
			
			array_push($user['current_app']['setting']['settings'], array(
			    'settings' => FillSetting($row)
			));
		}
	}
	// 7 => get the user defined settings

	// 8 => get friends

	$result = TryQuerry($conn, user_getFriends($user_id));
	if (mysqli_num_rows($result) > 0){
		while($row = $result->fetch_assoc()) {
			$user['friends'][] = $row;
		}
	}

	# JSON-encode the response
	echo $json_response = json_encode($user);
?>