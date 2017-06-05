<?php
	function setting_getColumn($table, $prog_id, $value, $column = 'id'){
		return "
			SELECT ".$table.".".$column." as id
			FROM ".$table."
				INNER JOIN setting 
						ON setting.parent_id = ".$table.".setting_id
				INNER JOIN type 
						ON type.id = setting.type_id AND type.prog_id = ".sqlString($prog_id)."

				WHERE 
					setting.value = ".sqlString($value)."
		";
	}

	function setting_getRows($table, $column, $value){
	    return "SELECT
				  setting.id,
				  setting.type_id,
				  type.prog_id,
				  type.name,
				  setting.value
				FROM
				  setting
				INNER JOIN type ON setting.type_id = type.id
				LEFT JOIN ".$table." ON ".$table.".setting_id = setting.parent_id
				WHERE ".$table.".".$column." = ".$value."
	";
	}

	function setting_getSettingsUnderParent($parent_id){
		return "
			SELECT
				setting.id,
				setting.type_id,
				type.prog_id,
				type.name,
				setting.value
			FROM
				setting
			INNER JOIN type ON setting.type_id = type.id
            WHERE setting.parent_id = ".$parent_id."
		";
	}

	function setting_Create($type_id, $value, $setting_parent_id){
		return "
			INSERT INTO setting
			(
				type_id,
				value,
				parent_id
			) VALUES (
				".sqlNr($type_id).",
				".sqlString($value).",
				".sqlNr($setting_parent_id)."
			)
		";
	}

	function FillSetting($row){
		return array(
				'id' => $row['id'],
				'type' => array(
					'id' => $row['type_id'],
					'prog_id' => $row['prog_id'],
					'name' => $row['name'],
				),
				'value' => $row['value']
			);
	}



	//




	function user_getSettings($user_con_app_id){
		return "
			SELECT
				setting.id as setting_id ,

				type.id,
				type.prog_id,
				type.name,

				setting.value
			FROM setting
				INNER JOIN type ON type.id = setting.type_id
			WHERE parent_id = (SELECT user_con_app.setting_id 
								FROM user_con_app
								WHERE user_con_app.id = ".sqlNr($user_con_app_id).")
		";
	}
?>