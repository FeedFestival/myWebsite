<?php
	
	function session_getSession($session_guid){
		$sessionTimeAllowed = 30;
		$time = date('Y-m-d H:i:00');	

		return "
			SELECT
			session.id,
			CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) as minutesAlive

			FROM session WHERE session.guid = '".$session_guid."'

			AND session.active = 1

			AND CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) >= 0
			AND CAST(((TIME_TO_SEC(TIMEDIFF('".$time."', session.active_date)))/60) as int) <= ".$sessionTimeAllowed."
		";
	}

	function session_closeSession($session_guid, $user_id = 0){
		if ($user_id != 0)
			return "
				UPDATE session
					SET session.active = 0
				WHERE
					session.user_id = ".$user_id." AND session.active = 1
			";
		return "
			UPDATE session
			SET session.active = 0
			WHERE session.guid = ".$session_guid."
		";
	}

	function session_closeAllSessions($user_id){
		return "
			UPDATE session
			SET session.active = 0
			WHERE session.user_id = ".$user_id.";
		";
	}

	function session_createSession($user_id, $guid){
		$time = date('Y-m-d H:i:00');

		return "
			INSERT INTO session (
 				guid,
 				start_date,
 				active_date,
 				user_id,
 				active
			)
			Values (
				'".$guid."',
				'".$time."',
				'".$time."',
				".$user_id.",
				1
			);
		";
	}

	function session_closeGame($game_id, $session_guid = 0){
		if ($game_id == "")
			return "
				UPDATE game
				SET game.active = 0
				WHERE game.session_id = (SELECT session.id FROM session WHERE session.guid = '".$session_guid."')
			";
		return "";
	}

	function session_refresh($session_guid){
		$time = date('Y-m-d H:i:00');
		return "
			UPDATE session
			SET session.active_date = '".$time."'
			WHERE session.guid = ".$session_guid."
		";
	}
?>