<?php
	
	function social_Create($table_ref, $facebook_id, $email){
		return " INSERT INTO social (
					table_ref,
					facebook_id,
					facebook_email
				) VALUES (
					'".$table_ref."',
					'".$facebook_id."',
					".($email == "" ? "NULL" : "'".$email."'")."
				)
		";
	}
?>