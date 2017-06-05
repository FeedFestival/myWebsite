
-- changes - 5 / 6 / 2017

UPDATE
	`menu` 
	SET `name` = 'txtWorkflow',
		`URL` = 'workflows'
	WHERE `menu`.`icon` = 'fa-map';

UPDATE 
	`menu` 
	SET `name` = 'txtTutorials',
		`URL` = 'tutorials'
	WHERE `menu`.`url` = 'home';

UPDATE
	`menu`
	SET `icon` = 'fa-newspaper-o'
	WHERE `menu`.`url` = 'tutorials';

INSERT
INTO
  `menu`(
  `URL`,
  `icon`,
  `name`)
VALUES(
  'portfolio',
  'fa-briefcase',
  'txtPortfolio'
);