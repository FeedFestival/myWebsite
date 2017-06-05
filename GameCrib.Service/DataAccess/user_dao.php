<?php

	function user_Create($name, $display_name, $password, $setting_id, $type_id){
		return "
			INSERT
			INTO
			  user (
				name,
				display_name,
				password,
				setting_id,
				type_id
			  )
			VALUES(
				".sqlString($name).",
				".sqlString($display_name).",
				".sqlString($password).",
				".sqlNr($setting_id).",
				".sqlNr($type_id)."
			);";
	}

	function user_addFriend($user_id, $friend_id){
		
		return "INSERT INTO friend
			(
				user_id,
				friend_id
			) VALUES (
			".sqlNr($user_id).",
			".sqlNr($friend_id)."
			);
		";
	}

	function FillUser($row){
		return array(
				'id' => $row['id'],
				'name' => $row['name'],
				'display_name' => $row['display_name'],
				'password' => $row['password'],
				
				'setting' => array(),
				//'apps' => array(),
				'friends' => array(),
			);
	}

	function user_getUser($user_id, $facebook_id, $withSession){
		$r = "
			SELECT user.id
				, user.name
				, user.display_name
				, user.password
			FROM user
			";

		if ($withSession)
			$r .= " INNER JOIN session ON session.user_id = user.id ";

		$r .= " WHERE 1 = 1 ";

		if (IsNullOrEmptyString($user_id) == false)
			$r .= " 
				AND user.id = N'".$user_id."'";

		if (IsNullOrEmptyString($facebook_id) == false)
			$r .= " 
				AND social.facebook_id = N'".$facebook_id."'";

		if ($withSession)
			$r .= " AND session.active = 1 ";

		return $r;
	}


	function user_getFriends($user_id){
		return " SELECT
					friend.id,
					friend.friend_id as  friend_user_id,
					friend_user.name as friend_user_name,
					setting.value as facebook_unique_id,
					friend.name as friend_name
				FROM friend
					LEFT JOIN user as friend_user ON friend_user.id = friend.friend_id
                    
                    LEFT JOIN setting ON friend_user.setting_id = setting.parent_id
                    
					INNER JOIN type ON setting.type_id = type.id
				WHERE 
					friend.user_id = ".$user_id."
		";
	}




	/////












	function user_getId($facebook_scoped_id){
		return "
				SELECT
					user.id
				FROM user
					LEFT JOIN user_con_app ON user_con_app.user_id = user.id
				WHERE
					Con_app_user.UserScopeId = ".$facebook_scoped_id."
			";
	}

	function user_getFriendsCount($user_id){
		return "
		SELECT 
			friend.id
		FROM friend
		WHERE 
			friend.user_id = ".$user_id." OR
			friend.friend_id = ".$user_id."
		";
	}

	function user_isFriend($user_id, $facebook_scoped_id){
		return "
			SELECT
				friend.id
			FROM friend
				WHERE user_id = ".$user_id."
					AND friend_id = (SELECT user.id
									FROM user
										LEFT JOIN user_con_app ON
											user_con_app.user_id = user.id
										LEFT JOIN social ON social.id = user_con_app.social_id
									WHERE social.facebook_id = ".$facebook_scoped_id.")
					OR user_id = (SELECT user.id
								FROM user
									LEFT JOIN user_con_app ON
										user_con_app.user_id = user.id
									LEFT JOIN social ON social.id = user_con_app.social_id
								WHERE social.facebook_id = ".$facebook_scoped_id.")
					AND friend_id = ".$user_id."";
	}

	function friend_addUser($user_id, $facebook_scoped_id){
		return "
			INSERT INTO friend
			(
				user_id,
				friend_id
			) VALUES (
			(SELECT user.id
				FROM user
					LEFT JOIN user_con_app ON
						user_con_app.user_id = user.id
					LEFT JOIN social ON social.id = user_con_app.social_id
				WHERE social.facebook_id = ".$facebook_scoped_id."),
			".$user_id."
			);
		";
	}

    function user_getPassword($facebook_id){
        
        $sql = "
		SELECT USER
		  .password
		FROM USER
		LEFT JOIN
		  social ON USER.social_id = social.id
		WHERE
		  social.facebook_id = '".$facebook_id."'
        ";
        return $sql;
    }

	function generatePassword($charLength){
        
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $charLength; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
    }

	function user_setPassword($password, $facebook_id){
		return "

		UPDATE User
				SET User.Password = '".$password."'
		WHERE User.facebook_id = N'".$facebook_id."'
		";
	}

	function IsNullOrEmptyString($question){
		return (!isset($question) || trim($question)==='');
	}
?>