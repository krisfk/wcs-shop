<?php
include 'config.php'; 
session_start();

function isSessionExpired() {
	$current_time = time(); 
	if(isset($_SESSION['token'])){  
		if(((time() - $_SESSION['in_time']) >SESSION_TIMEOUT )){ 
			return true; 
		}
		else{
					$_SESSION['in_time'] = time();  
		}
	}
	return false;
}


?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Pragma" content="no-cache">

	<meta charset="utf-8">
	<title>WCS Extra Lesson Purchase</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
	
	<link rel="stylesheet" href="style.css?t=<?php echo time();?>">
<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
-->
	
	<script type="text/javascript">
		var WCS_MAIN_PAGE = "<?php echo WCS_MAIN_PAGE;?>";
		var API_BASE_URL = "<?php echo API_BASE_URL;?>";
		var SHOP_INDEX = "<?php echo SHOP_INDEX;?>";
		
	</script>
</head>
	<?php
		$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

	        $filename = basename($url); // to get file name
			$arr = explode(".php",$filename);
			$pos= $arr[0];
	?>
<body class="<?php echo $pos;?>">
	
<?php

if(isset($_SESSION["token"])) {
	if(!isSessionExpired()) {
//		echo 'session continue';
	//	header("Location:user_dashboard.php");
	} else {
		
		echo '<input type="hidden" id="error" value="'.ERROR_TIMEOUT.'">';

//		echo 'expired session';
	//	header("Location:logout.php?session_expired=1");
	}
}
	else
	{
		echo '<input type="hidden" id="error" value="'.ERROR_TOKEN.'">';

//		echo 'expired session';
	}

	
	?>

	