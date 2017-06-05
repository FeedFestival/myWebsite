<?php
	function type_Create($prog_id, $name, $table_ref){
		return "
			INSERT INTO type (
				prog_id,
				name,
				table_ref
			) VALUES (
				'".$prog_id."',
				'".$name."',
				'".$table_ref."'
			)
		";
	}

	function type_getId($prog_id, $table_ref){
		return "
			SELECT 
				id
			FROM type
				WHERE prog_id = '".$prog_id."'
					AND table_ref = '".$table_ref."'
		";
	}
?>