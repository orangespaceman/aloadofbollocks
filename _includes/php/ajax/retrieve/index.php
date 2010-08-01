<?php

	if (isset($_POST) && count($_POST) > 0) {

		// check what to do
		require_once("../../librarymanager.php");
		$model = new JBombRetrieval;
		$method = $model->sanitise($_POST['method']);
		unset($_POST['method']);

		// 
		switch ($method) {

			// 
			case "retrieve":
				
				$count=(isset($_POST['limit'])) ? $_POST['limit'] : "10";
				$offset=(isset($_POST['start'])) ? $_POST['start'] : "0";
				$orderby=(isset($_POST['orderby']) && $_POST['orderby'] == "date") ? "d" : "p";

			 	$result = $model->retrieveBombs($count, $offset, $orderby);
				$return = array(
					"success" => 1,
					"details" => $result
				);
				echo json_encode($return);
			
			break;
		}
	}
	
	
	
/**
* Model
*/
class JBombRetrieval
{

	var $dbcalls;

	/*
	 *
	 */
	function __construct() {
		global $dbcalls;
		$this->dbcalls = $dbcalls;
	}
	

	/*
	 * sanitise input
	 */
	public function sanitise($string) {
		$string = strip_tags($string);
		$string = mysql_real_escape_string($string);
		return $string;
	}
	
	/*
	 *
	 */
	public function retrieveBombs($count, $offset, $orderby) {
		return $this->dbcalls->getBombs($count, $offset, $orderby);
	}
}