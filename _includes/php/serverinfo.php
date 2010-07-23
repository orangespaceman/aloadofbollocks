<?php
/**
 * This class is responsible for setting up the server details and for
 * determining whether the site is running on the dev server, or the live server
 */
class ServerInfo {
	
	// privates
	var $state;
	
	var $devServer;
	var $devDatabaseName;
	var $devUser;
	var $devPass;
	
	var $liveServer;
	var $liveDatabaseName;
	var $liveUser;
	var $livePass;
	
	var $siteDetails;

	
	/**
	 * Constructor - setup project's server details
	 *
	 * @access public 
	 */
	function ServerInfo() {
	
		//global details
		$this->siteDetails['name'] = "J-Bombs";
		
		// dev details
		$this->devServer = "localhost";
		$this->devDatabaseName = "j-bomb";
		$this->devUser = "root";
		$this->devPass = "root";
		
		// live details
		$this->liveServer = "localhost";
		$this->liveDatabaseName = "j-bomb";		
		$this->liveUser = "root";
		$this->livePass = "root";

	}
	
		
	/**
	 * Access method to return the server address
	 *
	 * @return string
	 * @access public
	 */
	function getServer() {
		return $this->getServerState() ? $this->liveServer : $this->devServer; 
	}
	
	
	/**
	 * Access method to return the database name
	 *
	 * @return string
	 * @access private
	 */
	function getDatabaseName() {
		// condition : get live or dev db
		return $this->getServerState() ? $this->liveDatabaseName : $this->devDatabaseName;
	}


	/**
	 * Access method to return the username
	 *
	 * @return string
	 * @access public
	 */
	function getUser() {
		// condition : get live or dev db username
		return $this->getServerState() ? $this->liveUser : $this->devUser; 
	}


	/**
	 * Access method to return the password
	 *
	 * @return string
	 * @access public
	 */
	function getPass() {
		return $this->getServerState() ? $this->livePass : $this->devPass;
	}
	
	/**
	 * Access method to return the site name
	 *
	 * @return string
	 * @access public
	 */
	function getSiteDetails() {
		return $this->siteDetails;
	}
	
	
	/**
	 * Determines whether the site is running on a live server or a dev server
	 *
	 * @return boolean true if live, false if dev
	 * @access private
	 */
	function getServerState() {
		//if it has been calculated already
		if (isset($this->state)) {
			return $this->state;
		
		//calculate the state 
		} else {
			
			//if it is dev
			if(strpos(HOST, ".") === FALSE || strpos(HOST, "localhost") !== FALSE || strpos(HOST, "192.168") !== FALSE) {
				$this->state = false;
			
			//if it is live
			} else {
				$this->state = true;
			}
			
			//return the state
			return $this->state;
		}
	}
}
?>