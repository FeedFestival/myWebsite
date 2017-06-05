<?php
/**
 * Created by PhpStorm.
 * User: dani
 * Date: 11/29/2016
 * Time: 12:14 AM
 */
session_start();

$servername = "localhost";
$username = "id1570128_simionescudani07"; // "root"
$password = "fire4test"; // ""
$dbName = "id1570128_game_crib"; // "game_crib"

// Make Connection
$conn = new mysqli($servername, $username, $password, $dbName);

// Check Connection
if (!$conn){
    die("Connection Failed. ". mysqli_connect_error());
}
// header("Pragma: no-cache");
// header("Cache-Control: no-cache")
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('P3P: CP="CAO PSA OUR"'); // Makes IE to support cookies
header("Content-Type: application/json; charset=utf-8");

	function getId($result){
		if (mysqli_num_rows($result) < 1) {
			return -1;
		} else {
			while($row = $result->fetch_assoc()) {
				return $row['id'];
			}
		}
	}

	function TryQuerry($conn, $sql, $scope_identity = false){
		mysqli_autocommit($conn, FALSE);

		$insert_id = 0;

		$r = mysqli_query($conn, $sql);
		$insert_id = $conn->insert_id;

		mysqli_commit($conn);

		if ($r){
			if ($scope_identity) {
				return $insert_id;
			}
			return $r;
		} else {
			//print_r(" - querry failed for:
			//".$sql);
			http_response_code(405);
			echo json_encode(
				array('Error' => "".$sql."
- Querry FAILED. ".mysqli_error($conn))
			);

			/* Rollback */
			mysqli_rollback($conn);

			mysqli_close($conn);
			exit;
		}
	}

	function toObject($post) {
		if (empty($post)) {
			print_r("POST data is empty");
			http_response_code(405);
			echo json_encode(
				array('Error' => "Method inconsistent.")
			);
			exit;
		}

		$count = count($_POST);
		if ($count > 1){
			print_r("POST data should be one JSON object. Found ".$count.".");
			http_response_code(405);
			echo json_encode(
				array('Error' => "Parameter inconsistent.")
			);
			exit;
		}

		// we send our data as a key- angular problem i guess.
		// so we decode the key and return te dictionay.
		foreach($post as $key => $value) {
			print_r(" JSON = ".$key 
			    );
			return json_decode($key, true);
		}
	}

	// CHECK SESSION

	function CheckSession($session_guid, $connection, $echo = false){
		if (empty($session_guid) || is_null($session_guid)){
			if ($echo) {
				http_response_code(405);
				echo json_encode(
					array('Error' => "Session exists not.")
				);
				exit;
			}
			return false;
		}

		//include($_SERVER['DOCUMENT_ROOT']."/GameCrib.Service/DataAccess/session_dao.php");
		//print_r(session_getSession($session_guid));

		$sessionTimeAllowed = 30;
		$time = date('Y-m-d H:i:00');	
		$sql = "
			SELECT
			session.id,
			CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) as minutesAlive

			FROM session WHERE session.guid = '".$session_guid."'

			AND session.active = 1

			AND CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) >= 0
			AND CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) <= ".$sessionTimeAllowed."
			";
		$result = mysqli_query($connection, $sql);

		//    print_r($sql." - ".mysqli_num_rows($result)."
		//    ");

		if (mysqli_num_rows($result) < 1) {
			// if session doesnt exist or expired.

			$sql = "
				UPDATE session
				SET session.active = 0
				WHERE session.guid = ".$session_guid."
			";
			mysqli_query($connection, $sql);

			$sql = "
				UPDATE game
				SET game.active = 0
				WHERE game.session_id = (SELECT session.id FROM session WHERE session.guid = '".$session_guid."')
			";
			mysqli_query($connection, $sql);

			if ($echo) {
				http_response_code(405);
				echo json_encode(
					array('Error' => "Session expired it is.")
				);
				exit;
			}
			return false;
		}

		$time = date('Y-m-d H:i:00');
		$sql = "
			UPDATE session
			SET session.active_date = '".$time."'
			WHERE session.guid = ".$session_guid."
		";

		mysqli_query($connection, $sql);
		return true;
	}
?>