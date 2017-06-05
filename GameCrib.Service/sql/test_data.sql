 /*Populate app.table*/

INSERT INTO type (
	prog_id,
	name,
	table_ref
) VALUES (
	'facebook_id',
	'Facebook id',
	'app_setting'
);
INSERT INTO type (
	prog_id,
	name,
	table_ref
) VALUES (
	'token_for_business',
	'Facebook token for business',
	'app_setting'
);
INSERT INTO type
(
    prog_id,
    name,
    table_ref
) VALUES (
    'GOD',
    'God',
    'user'
);
INSERT INTO type
(
    prog_id,
    name,
    table_ref
) VALUES (
    'ADMIN',
    'Admin',
    'user'
);

INSERT INTO type
(
    prog_id,
    name,
    table_ref
) VALUES (
    'facebook_unique_id',
    'Facebook third_party_id',
    'user'
);

INSERT INTO type
(
    prog_id,
    name,
    table_ref
) VALUES (
    'facebook_email',
    'Facebook Email',
    'user'
);

INSERT INTO type
(
    prog_id,
    name,
    table_ref
) VALUES (
    'user_scoped_id',
    'Facebook scoped_id',
    'user_con_app'
);

/*
	--------------
	FeedFestStudio

*/

SELECT type.id 
INTO @type_id 
FROM type WHERE type.prog_id = 'facebook_id';

INSERT INTO setting( value )
	VALUES( 'FeedFestStudio settings' );

SELECT setting.id 
INTO @setting_id
FROM setting WHERE value = 'FeedFestStudio settings';

INSERT INTO setting (
	type_id,
	value,
	parent_id
) VALUES (
	@type_id,
	'1193283007398999',
	@setting_id
);

SELECT type.id 
INTO @type_id 
FROM type WHERE type.prog_id = 'token_for_business';

INSERT INTO setting(
	type_id,
	value,
	parent_id
) VALUES (
	@type_id,
	'AbwHKPwulln12aGN',
	@setting_id
);
INSERT INTO app (
	name,
    setting_id
) VALUES (
	'FeedFestStudio',
	@setting_id
);

/*
	--------------
	PuzzleSphere

*/

INSERT INTO setting( value )
	VALUES( 'PuzzleSphere settings' );
    
SELECT type.id 
INTO @type_id 
FROM type WHERE type.prog_id = 'facebook_id';
    
SELECT setting.id 
INTO @setting_id
FROM setting WHERE value = 'PuzzleSphere settings';
    
INSERT INTO setting(
	type_id,
	value,
	parent_id
) VALUES (
	@type_id,
	'267365840301857',
	@setting_id
);

SELECT type.id 
INTO @type_id 
FROM type WHERE type.prog_id = 'token_for_business';

INSERT INTO setting(
	type_id,
	value,
	parent_id
) VALUES (
	@type_id,
	'AbwHKPwulln12aGN',
	@setting_id
);
INSERT INTO app (
	name,
    setting_id
) VALUES (
	'PuzzleSphere',
    @setting_id
);




/* MENUS */

INSERT
INTO
  `menu`(
  `URL`,
  `icon`,
  `name`)
VALUES(
  'home',
  'fa-home',
  'txtNews'
);

INSERT
INTO
  `menu`(
  `URL`,
  `icon`,
  `name`)
VALUES(
  'tutorials',
  'fa-map',
  'txtTutorials'
);

INSERT
INTO
  `menu`(
  `URL`,
  `icon`,
  `name`)
VALUES(
  'games',
  'fa-gamepad',
  'txtGames'
);

SELECT type.id 
INTO @type_id 
FROM type WHERE type.prog_id = 'GOD';

INSERT
INTO
  `menu`(
  `URL`,
  `icon`,
  `name`,
  `type_id`)
VALUES(
  'admin',
  'fa-question-circle',
  'txtAdminPanel',
  @type_id 
);
