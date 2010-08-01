<?php 
/*
 * generic database connection class
 * 
 */
class dbCon {
	
	// privates
	var $server;
	var $dbname;
	var $user;
	var $pass;
	var $conn;
	
	/**
	 * The constructor.
	 */
	function __construct() {
	
		//import the site-specific database info
		$info = new ServerInfo();
		
		$this->server = $info->getServer();
		$this->user = $info->getUser();
		$this->pass = $info->getPass();
		$this->database = $info->getDatabaseName();
		
		//start the connection
		$this->conn = @mysql_connect($this->server,$this->user,$this->pass);
		@mysql_select_db($this->database, $this->conn);

	}
	
	/**
	 * Generic MySQL select query 
	 */
	function selectQuery($sql) {
		
		//run the initial query
		$result = @mysql_query($sql);
		
		//condition : if it is a single value, return it
		if (@mysql_num_fields($result) === 1 && @mysql_num_rows($result) === 1) {
			list($return) = @mysql_fetch_row($result);

		//condition : if it is a single row, don't bother putting it into an array first
		//} else if (@mysql_num_rows($result) === 1) {
		//	$return = @mysql_fetch_object($result);
		
		// it is more than a single row, start an array to contain each object...
		} else {
			
			//start the var to return
			$return = array();
		
			//for each row in the result, start a new object
			while ($row = @mysql_fetch_object($result)) {
				$return[] = $row;
			}
		}
		
		return $return;
	}


	/**
	 * Generic MySQL select query 
	 */
	function updateQuery($sql) {
		
		//run the initial query
		$result = mysql_query($sql);
		
		if ($result) {
			$return = true;
		} else {
			$return = false;
		}
		
		return $return;
	}
	
	
	/**
	 * Generic MySQL select query 
	 */
	function addQuery($sql) {
		
		//run the initial query
		$result = mysql_query($sql);
		
		if ($result) {
			$return = mysql_insert_id();
		} else {
			$return = false;
		}
		
		return $return;
	}
}
?>