<?php 
/*
 * database calls class
 *
 */
class dbCalls {
	
	var $dbCon;
	
	/**
	 * The constructor.
	 */
	function __construct() {
		global $dbCon;
		$this->dbCon = $dbCon;	
	}



	/*
	 * get bombs
	 */
	function getBombs($count="10", $offset="0", $orderby="d") {
		
		$sql = "SELECT *, date_format(dateadded, '%W %D %M %Y, %k:%i') as date_added from `j-bombs` ";

		if ($orderby == "d") {
			$sql .= " Order by dateadded desc ";
		} else if ($orderby == "p") {
			$sql .= " Order by views desc ";
		}

		if (!empty($count)) {
			$sql .= " Limit " . $offset . " , " . $count;
		}

		$result = $this->dbCon->selectQuery($sql);
		
		// add in a hard-coded URL
		foreach ($result as $value) {
			$value->url = 'http://' . $_SERVER['SERVER_NAME'] . '/' . $value->slug;
		}
		
		return $result;
	}
	
	
	
	/*
	 * get bomb
	 */
	function getBomb($slug) {
		$sql = "SELECT * FROM `j-bombs` WHERE `slug` = '".$slug."' limit 0,1";
		$result = $this->dbCon->selectQuery($sql);
		return $result;
	}


	/*
	 * get bomb
	 */
	function getBombCount() {
		$sql = "SELECT count('id') as bombcount FROM `j-bombs`";
		$result = $this->dbCon->selectQuery($sql);
		return $result;
	}
	
	
	/*
	 * check slug exists
	 */
	function checkSlugValidity($slug) {
		
		// check slug is valid as a URL
		$regexPattern = "/^[a-zA-Z0-9_-]{1,}$/";
		$regexValid = preg_match($regexPattern, $slug);
		if ($regexValid < 1) {
			return array(
				"success" => 0,
				"message" => "Slug contains invalid characters"
			);
		}
		
		// if slug is fine, check if it has already been used
		$sql = "SELECT count(slug) FROM `j-bombs` WHERE `slug` = '".$slug."' limit 0,1";
		$result = $this->dbCon->selectQuery($sql);
		$result = intval($result);
		if ($result > 0) {
			return array(
				"success" => 0,
				"message" => "Slug already used"
			);
		} else {
			return array(
				"success" => 1,
				"message" => "Slug valid and available"
			);
		}
	}
	
	
	
	/*
	 * get a count of the number of views
	 */
	function getImageCount($slug) {
		$sql = "SELECT views from `j-bombs` where WHERE `slug` = '".$slug."' limit 0,1";
		$result = $this->dbCon->selectQuery($sql);
		return $result;
	}



	/*
	 * increase by one the number of views
	 */
	function increaseImageCount($slug) {
		$sql = "UPDATE `j-bombs` set views = views + 1 WHERE `slug` = '".$slug."'";
		$result = $this->dbCon->updateQuery($sql);
		return $result;
	}
	

	
	/*
	 * add Bomb
	 */
	function addBomb($post) {
		
		// sanitise
		foreach($post as $key => $postitem) {
			$postitem = strip_tags($postitem);
			$postitem = mysql_real_escape_string($postitem);
			$post[$key] = $postitem;
		}
		
		// error check
		$basicFields = array('title');
		$errors = array();
		foreach ($basicFields as $field) {
			if (empty($post[$field])) {
				array_push($errors, $field);
			}
		}
		
		// check image is a gif
		$gifValidity = $this->checkGifValidity($post['imgurl']);
		if ($gifValidity['success'] == 0) {
			array_push($errors, 'imgurl');
		}
		
		// check slug is available
		$slugValidity = $this->checkSlugValidity($post['slug']);
		if ($slugValidity['success'] == 0) {
			array_push($errors, 'slug');
		}
		
		
		if (count($errors) > 0) {
			$errorString = "";
			foreach ($errors as $error) {
				$errorString .=  $error . ", ";
			}
			
			$errorString = substr($errorString,0,-2);
			return array(
				'success' => false,
				'message' => 'There were errors with the following fields: ' . $errorString
			);
		} else {
		
			
		
			//insert 
			$sql = "INSERT into `j-bombs` 
				(title, slug, imgurl, midiurl, ip, views, dateadded) values (
					'".$post['title']."', 
					'".$post['slug']."',
					'".$post['imgurl']."', 
					'".$post['midiurl']."', 
					'".$_SERVER['REMOTE_ADDR']."', 
					'0', 
					 NOW()
				)";

			$result = $this->dbCon->addQuery($sql);
			
			$url = 'http://' . $_SERVER['SERVER_NAME'] . '/' . $post['slug'];
			
			$post['url'] = $url;
			$post['dateadded'] = "Just now";
			$post['views'] = 0;
			
			return array( 
				'success' => true,
				'message' => '
						<h3>Bomb added!</h3>
						<p>
							URL: <textarea readonly="readonly">'.$url.'</textarea>
						</p>
						<img src="'.$post['imgurl'].'" alt="'.$post['title'].'" width="225" />
					',
				'details' => $post
			);
		}
	}
	
	
	
	/*
	 * Check Gif Mime Type
	 */
	function checkGifValidity($imgurl) {
		
		$file = @getimagesize($imgurl);
		if (!isset($file['mime'])) {
			return array( 
				'success' => false,
				'message' => "Not a valid image URL"
			);
		}
		
		$mimetype = $file['mime'];
		if ($mimetype == "image/gif") { 
			return array( 
				'success' => true,
				'message' => "Valid GIF"
			);
		} else {
			return array( 
				'success' => false,
				'message' => "Not a GIF"
			);
		}
	}
}
?>