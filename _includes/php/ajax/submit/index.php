<?php

	if (isset($_POST) && count($_POST) > 0) {

		// check what to do
		require_once("../../librarymanager.php");
		$model = new JBomb;
		$method = $model->sanitise($_POST['method']);
		unset($_POST['method']);

		// 
		switch ($method) {

			// save post
			case "save":
				$result = $model->save($_POST);
				echo json_encode($result);
			break;
			
			// error check
			case "slug":
				$slug = $model->sanitise($_POST['slug']);
			 	$result = $model->checkSlugValidity($slug);
				echo json_encode($result);
			
			break;
			
			// error check
			case "gif":
				$imgurl = $model->sanitise($_POST['imgurl']);
			 	$result = $model->checkGifValidity($imgurl);
				echo json_encode($result);
			
			break;
		}
	}
	
	
	
/**
* Model
*/
class JBomb
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
	 * check slug validity
	 */
	public function checkSlugValidity($string) {
		if (strlen($string) > 0) {
			return $this->dbcalls->checkSlugValidity($string);
		} else {
			return array(
				"success" => 0,
				"message" => "Slug can't be empty"
			);
		}
	}
	
	
	/*
	 * check gif mime type
	 */
	public function checkGifValidity($imgurl) {
		return $this->dbcalls->checkGifValidity($imgurl);
	}
	
	
	/**
	 * Saves results via Campaign Monitor API
	 * @return boolean
	 */
	public function save(array $post)
	{
		// clean the post up
		foreach($post as $key => $postitem) {
			$post[$key] = $this->sanitise($postitem);
		}

		return $this->dbcalls->addBomb($post);
	}
}