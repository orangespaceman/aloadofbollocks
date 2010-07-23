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

		$return = '<!DOCTYPE html>
<html>
	<head>
		<title>'.$bomb->title.' | J-Bomb</title>	
		<meta charset="UTF-8" />
		<style>
			* { margin:0; padding:0; }
			html, body { width:100%; height:100%; background:#000; }
			#bomb  { position:absolute; z-index:2; width:100%; height:100%; }
			#close { position:absolute;z-index:3;right:10px;top:10px;font-family:sans-serif;font-size:12px; }
			h1 { position:absolute;z-index:3;left:10px;bottom:10px;font-family:sans-serif;font-size:12px;}
			a { color:#fff; text-decoration:none }
			a:hover { color:#ff0; }
			body {
				background: url('.$bomb->imgurl.') #000 center center fixed no-repeat;
				-moz-background-size: contain;
				background-size: contain;
			}
		</style>
		';
		
		if (!empty($bomb->midiurl) || !empty($bomb->midilocal)) {
			$return .= '
		<script src="./_includes/js/lib/midi/addMidi.js"></script>
		<script>
			window.onload = function() {
			 	//addMidi.init("./midi.mid", "midifile");
			}
		</script>
			';
		}
		
		$return .= '
	</head>
	<body>
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

		$bombs = $this->dbcalls->getBombs();
		
		$localMidiFiles = $this->getLocalMidiFiles();

		$return = '<!DOCTYPE html>
<html>
	<head>
		<title>J-Bomb</title>	
		<meta charset="UTF-8" />
		<link rel="stylesheet" href="./_includes/css/site/screen.css" />
		<script src="http://www.google.com/jsapi"></script>
		<script>
			google.load("jquery", "1.4.2");
		</script>
		<script src="./_includes/js/lib/forms/jquery.typing.min.js"></script>
		<script src="./_includes/js/site/form.js"></script>
		<script src="./_includes/js/site/init.js"></script>
	</head>
	<body>
		<div id="wrapper">
			<h1>J-Bomb</h1>
			
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
									<label for="midilocal">Midi (local)</label>
									<select id="midilocal" name="midilocal">
										<option></option>
								';
							
								foreach ($localMidiFiles as $midi) {
									$return .= '
										<option>'.$midi.'</option>
									';
								}
							
								$return .= '
									</select>
								</div>
					
								<div class="input-container clearfix">
									<label for="midiurl">Midi (URL)</label>
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
			
				<div id="existing-bombs" class="clearfix">
					<h3>Existing J-Bombs</h3>
			';
		

			foreach ($bombs as $key => $bomb) {
				$return .= '
					<p class="bomb-wrapper" id="bomb-'.$bomb->slug.'">
						<a class="bomb clearfix" href="./'.$bomb->slug.'">
							<img src="'.$bomb->imgurl.'" width="100" />
							<span class="bomb-content">
								<strong>'.$bomb->title.'</strong><br />
								<em>Added:</em> <span class="bomb-dateadded">'.$bomb->dateadded.'</span><br />
								<em>Views:</em> <span class="bomb-views">'.$bomb->views.'</span><br/>
				';
				
				// condition : allow edit if same IP address
				if ($bomb->ip == $_SERVER['REMOTE_ADDR']) {
					$return .= '
								<!--<span class="edit">Edit</span>-->
					';
				}
				
				$return .= '
							</span>
						</a>
					</p>
			';
		}

		$return .= '
				</div>
	</div>
</body>
</html> 
		';

		return $return;
	}
	
	
	
	/*
	 * Get local midi files
	 */
	function getLocalMidiFiles() {
		
		$return = array();
		$dir    = dirname(__FILE__).'/../../../midi/';
		$files = scandir($dir);
		if (count($files) > 0) {
			foreach ($files as $key => $file) {
				if (!is_dir($file) && substr(strrchr($file, '.'), 1) == 'mid') {
					array_push($return, $file);
				}
			}
		}
		
		return $return;
	}
	
}