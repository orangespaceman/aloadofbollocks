<?php
	require_once("./_includes/php/librarymanager.php");
	$pageBuilder = new PageBuilder;
	
	
	// condition : slug is set, show j-bomb
	if (isset($_GET['slug'])) { 
		
		$slug = strip_tags($_GET['slug']);
		$slug = mysql_real_escape_string($slug);

		// check bomb exists
		$bomb = $dbcalls->getBomb($slug);
		
		// condition : if bomb not found, display error
		if (count($bomb) < 1) {
			$message = array(
				'success' => 0,
				'message' => 'No bomb found'
			);
			echo $pageBuilder->buildForm($message);

		// show bomb!
		} else {
			echo $pageBuilder->buildBomb($bomb[0]);
		}


	// no slug is set, show entry form and table
	} else { 
		
		$message = null;
		
		// condition : parse POST?
		if (!empty($_POST)) {
			$message = $dbcalls->addBomb($_POST);
		}
		
		echo $pageBuilder->buildForm($message);
	}