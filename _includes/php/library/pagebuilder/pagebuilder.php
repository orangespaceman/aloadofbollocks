<?php 
/**
 * page builder class.  
 * build page header and footer
 *
*/
class PageBuilder {
	
	var $dbcalls;
	
	/**
	 * The constructor.
	 */
	function __construct() {
		global $dbcalls;
		$this->dbcalls = $dbcalls;
	}

	
	/**
	 * Build the bomb
	 */
	function buildBomb($bomb) {

		$this->dbcalls->increaseImageCount($bomb->slug);
		
		$ini_array = parse_ini_file(dirname(__FILE__)."/../../../../config.ini.php", true);

		$return = '<!DOCTYPE html>
<html>
	<head>
		<title>'.$bomb->title.' | J-Bomb</title>	
		<meta charset="UTF-8" />
		<link rel="shortcut icon" href="/_includes/icons/favicon.ico" type="image/x-icon" />
		<link rel="icon" href="/_includes/icons/favicon.ico" type="image/x-icon" />
		<style>
			* { margin:0; padding:0; }
			html, body { width:100%; height:100%; background:#000; }
			#bomb  { position:absolute; z-index:2; width:100%; height:100%; }
			#close { position:absolute;z-index:3;right:10px;top:10px;font-family:sans-serif;font-size:12px; }
			h1 { position:absolute;z-index:3;left:10px;bottom:10px;font-family:sans-serif;font-size:12px;}
			a { color:#fff; text-decoration:none }
			a:hover { color:#ff0; }
			body.loading {
				background: url(/_includes/img/site/ajax-loader-black.gif) #000 center center fixed no-repeat;
			}
			body.loaded {
				background: url('.$bomb->imgurl.') #000 center center fixed no-repeat;
				-moz-background-size: contain;
				background-size: contain;
			}
		</style>
		';
		
		if (!empty($bomb->midiurl)) {
			$return .= '
		<script src="./_includes/js/lib/midi/addMidi.js"></script>
		<script>
			window.onload = function() {
			 	addMidi.init("'.$bomb->midiurl.'", "midifile");
			}
		</script>
			';
		}
		
		$return .= '
		
		<script>
			var img = new Image();
			img.src = "'.$bomb->imgurl.'";
			img.onload = function() {
				document.getElementsByTagName("body")[0].className = "loaded";
			}
		</script>
		
		<script type="text/javascript">
			var _gaq = _gaq || [];
		';
		if (isset($ini_array['config']['analytics'])) {
			$return .='
			_gaq.push(["_setAccount", "'.$ini_array['config']['analytics'].'"]);
			_gaq.push(["_trackPageview"]);

			(function() {
			var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
			ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
			var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
			})();
			';
		}
		$return .='
		</script>
		
	</head>
	<body class="loading">
		<h1><a href="./">J-bomb!</a></h1>
		<p id="close"><a href="./">x</a></p>
		<div id="bomb"></div>
	</body>
</html> 
		';
		
		return $return;
			
	}
	
	
	
	/**
	 * Build the form
	 */
	function buildForm($message="") {

		// get bombs
		$count = (isset($_GET['c'])) ? $_GET['c'] : 10;
		$offset = (isset($_GET['s'])) ? $_GET['s'] : 0;
		$order = (isset($_GET['o']) && $_GET['o'] == "p") ? "p" : "d";		
		$bombs = $this->dbcalls->getBombs($count, $offset, $order);
		$bombCount = $this->dbcalls->getBombCount();
		
		$canAddBomb = $this->dbcalls->canAddBomb();
		
		$ini_array = parse_ini_file(dirname(__FILE__)."/../../../../config.ini.php", true);

		$return = '<!DOCTYPE html>
<html>
	<head>
		<title>aloadofbollocks.com</title>	
		<meta charset="UTF-8" />
		<link rel="stylesheet" href="./_includes/css/site/screen.css" />
		';
		
		$android = preg_match("/Android/i", $_SERVER['HTTP_USER_AGENT']);
		$iPhone = preg_match("/iP(hone|od)/i", $_SERVER['HTTP_USER_AGENT']);
		$iP = preg_match("/iP(hone|od|ad)/i", $_SERVER['HTTP_USER_AGENT']);
		if ($iPhone == true || $android == true){
	  		echo '
		<link rel="stylesheet" href="./_includes/css/site/mobile.css" />		
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
			';
		}

		
		$return .= '
		<link rel="shortcut icon" href="/_includes/icons/favicon.ico" type="image/x-icon" />
		<link rel="icon" href="/_includes/icons/favicon.ico" type="image/x-icon" />
				
		<script src="http://www.google.com/jsapi"></script>
		<script>
			google.load("jquery", "1.4.2");
		</script>
		<script src="./_includes/js/lib/forms/jquery.typing.min.js"></script>
		<script src="./_includes/js/lib/clipboard/ZeroClipboard.js"></script>
		<script src="./_includes/js/lib/clipboard/permalink.js"></script>
		<script src="./_includes/js/site/form.js"></script>
		<script src="./_includes/js/site/bombs.js"></script>
		<script src="./_includes/js/site/init.js"></script>
		
		<script type="text/javascript">
			var _gaq = _gaq || [];
		';
		if (isset($ini_array['config']['analytics'])) {
			$return .='
			_gaq.push(["_setAccount", "'.$ini_array['config']['analytics'].'"]);
			_gaq.push(["_trackPageview"]);

			(function() {
			var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
			ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
			var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
			})();
			';
		}
		$return .='
		</script>
		
	</head>
	<body>
		<div id="wrapper">
			<header>
				<h1>a load of bollocks</h1>
				<div id="order">
					<ul class="horiznavlist clearfix">
						<li id="order-date" class="first">Order by: <a class="date" href="./?o=d">Date added</a>
						<li id="order-popularity" class="last"><a class="popularity" href="./?o=p">Popularity</a>
					</ul>
				</div>
			</header>
			
			';
			
			if ($canAddBomb) {
				
				$return .= '
			
			<div class="row clearfix">
				<div id="bomb-form">
					<h2>Add a J-Bomb</h2>
					<form id="j-bomb-form" method="POST" action="">
						<fieldset id="j-bomb-form-image">
							<legend>J-Bomb image</legend>
					
							<div class="input-container clearfix">
								<label for="imgurl">Image URL</label>
								<input type="text" class="text required url" id="imgurl" name="imgurl"'; if (isset($_POST['imgurl'])) {$return .= 'value="'.$_POST['imgurl'].'"';} $return .=' />
							</div>
						</fieldset>
					
						<fieldset id="j-bomb-form-meta">
							<legend>J-Bomb meta</legend>
				
							<div class="input-container clearfix">
								<label for="title">Title</label>
								<input type="text" class="text required" id="title" name="title"'; if (isset($_POST['title'])) {$return .= 'value="'.$_POST['title'].'"';} $return .=' /> 
							</div>
				
							<div class="input-container clearfix">
								<label for="slug">Slug</label>
								<input type="text" class="text required alphanum" id="slug" name="slug"'; if (isset($_POST['slug'])) {$return .= 'value="'.$_POST['slug'].'"';} $return .=' />
							</div>
						</fieldset>
				
						<fieldset id="j-bomb-form-midi">
							<legend>J-Bomb midi</legend>
							<div class="input-container clearfix">
								<label for="midiurl">Midi URL (optional)</label>
								<input type="text" class="text" id="midiurl" name="midiurl"'; if (isset($_POST['midiurl'])) {$return .= 'value="'.$_POST['midiurl'].'"';} $return .=' />
							</div>
						</fieldset>
					
						<fieldset id="j-bomb-form-submit">
							<legend>J-Bomb submit</legend>
				
							<div class="input-container clearfix">
								<input type="submit" class="button" value="Save" /> 
							';

							if (isset($message) && !empty($message)) {
								$return .= '
									<p class="error">'.$message['message'].'</p>
								';
							}

							$return .= '
						
							</div>
						</fieldset>
					</form> 
				</div>
			</div>
		';
		
		}
		
		
		$return .= '
			<div id="existing-bombs" class="clearfix">
		';
	

		foreach ($bombs as $key => $bomb) {

			$url = 'http://' . $_SERVER['SERVER_NAME'] . '/' . $bomb->slug;
			
			$return .= '
				<div class="bomb-container" id="bomb-'.$bomb->slug.'">
					<div class="bomb clearfix">
						<div class="bomb-image">
							<a href="./'.$bomb->slug.'">
								<img src="'.$bomb->imgurl.'"  />
							</a>
						</div>
						<div class="bomb-content">
							<h2><a href="./'.$bomb->slug.'">'.$bomb->title.'</a></h2>
							<p><em>Added:</em> <span class="bomb-dateadded">'.$bomb->date_added.'</span></p>
							<p><em>Views:</em> <span class="bomb-views">'.$bomb->views.'</span></p>
						</div>
						<div class="bomb-view">
							<p class="url">'.$url.'</p>
							<ul class="horiznavlist clearfix">
								<li class="first last"><a href="./'.$bomb->slug.'">View</a></li>
							</ul>
						</div>
		';
		
		// condition : allow edit if same IP address
		if ($bomb->ip == $_SERVER['REMOTE_ADDR']) {
			$return .= '

			';
		}
		
		$return .= '
				</div>
			</div>
		';
	}

	$return .= '
			</div>

			<footer>
				<div class="row clearfix">
	';

if ($bombCount > $count) {
	if ($offset > 0) {
		$return .= '
			<p id="page-less"><a href="./?s='.($offset-$count).'&amp;o='.$order.'">&lt; More bombs</a></p>
		';
	}
	if ($bombCount > ($offset + $count)) {
		$return .= '
			<p id="page-more"><a href="./?s='.($offset+$count).'&amp;o='.$order.'">More bombs &gt;</a></p>
		';
	}
}
	
	// create count string
	$startCount = $offset+1;
	$endCount = $offset+10;
	if ($endCount > $bombCount) {
		$endCount = $bombCount;
	}
	$orderbyText = ($order == "p") ? "popularity" : "date";
	
	$return .= '
				</div>
		</footer>
	</div>
	<div id="count">
		<p>Showing <span id="start-count">'.$startCount.'</span>-<span id="end-count">'.$endCount.'</span> of <span id="bomb-count">'.$bombCount.'</span>, ordered by <span id="order-by">'.$orderbyText.'</span></p>
	</div>
</body>
</html> 
		';

		return $return;
	}
	
}