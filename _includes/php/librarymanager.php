<?
/*
 * Library manager imports all necessary php files from the library...
 */

	// define constants
	define("LIBRARY", dirname(__FILE__));
	define("HOST", $_SERVER['HTTP_HOST']);
	define("CURRENT_PAGE", $_SERVER['REQUEST_URI']);

	//import globally required library files
	include_once(LIBRARY."/library/db/dbCon.php");	
	include_once(LIBRARY."/library/pagebuilder/pagebuilder.php");

	//import site-specific files
	include_once(LIBRARY."/dbcalls.php");
	include_once(LIBRARY."/serverinfo.php");

	//start the global variables
	$serverinfo = new serverInfo();
	$dbCon = new dbCon();
	$sitedetails = $serverinfo->getSiteDetails();
	$dbcalls = new dbCalls();

?>