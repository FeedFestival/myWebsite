<?php
	
	function app_createConnection($user_id, $app_id, $setting_id, $settings_json){
		return "
			INSERT INTO user_con_app (
				user_id,
				app_id,
				setting_id,
				settings_json
			) VALUES (
				".sqlNr($user_id).",
				".sqlNr($app_id).",
				".sqlNr($setting_id).",
				".sqlString($settings_json)."
			)
		";
	}

	function app_getApps(){
		return "
		SELECT app.id, app.name, app.setting_id 
		FROM app
		";
	}

	function app_getMenus($admin = false){
		if ($admin)
			return "
				SELECT
				  id,
				  URL,
				  icon,
				  name
				FROM
				  menu
				WHERE menu.type_id IS NULL OR menu.type_id = (SELECT type.id FROM type WHERE type.prog_id = 'GOD')
			";
		return "
			SELECT
			  id,
			  URL,
			  icon,
			  name
			FROM
			  menu
			WHERE menu.type_id IS NULL
		";
	}

	function app_getApp($app_id, $user_id = 0){
		$s = "	SELECT 
					app.id, app.name";
		if ($user_id > 0)
			$s .= " , user_con_app.id as connect_id
                    , user_con_app.setting_id
                    , user_con_app.settings_json";
		$s .= "	FROM app ";
		if ($user_id > 0)
			$s .= "
				INNER JOIN user_con_app ON user_con_app.app_id = app.id
                    		AND user_con_app.user_id = ".$user_id."
			";
		$s .= "WHERE app.id = ".sqlNr($app_id);

		return $s;
	}

	function FillApp($row, $withUserConnection = false){
		if ($withUserConnection)
			return array(
				'id' => $row['id'],
				'name' => $row['name'],
				'connect_id' => $row['connect_id'],
				'setting' => array ( 'id' => $row['setting_id']),
				'app_settings' => $row['settings_json']
			);
		return array(
				'id' => $row['id'],
				'name' => $row['name']
			);
	}


	//



	function app_getUserApps($user_id){
		return "
			SELECT 
			app.id, app.name, 
			social.facebook_id
		FROM app
			LEFT JOIN social ON social.id = app.social_id
			INNER JOIN user_con_app ON user_con_app.user_id = ".$user_id."
								AND user_con_app.app_id = app.Id ";
	}

	

	function app_isUserConnected($user_id, $facebook_app_id){
		return "
			SELECT
				user_con_app.id
			FROM user_con_app
            	LEFT JOIN app On user_con_app.app_id = app.id
            	LEFT JOIN social ON social.id = app.social_id
            WHERE user_con_app.user_id = ".$user_id."
				AND social.facebook_id = '".$facebook_app_id."'
		";
	}
?>