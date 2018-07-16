<?php
include 'config.php';
session_start();
?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Pragma" content="no-cache">

	<meta charset="utf-8">
	<title>WCS Extra Lesson Purchase</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
	
	<link rel="stylesheet" href="style.css?t=<?php echo time();?>">
	
	<script type="text/javascript">
		var WCS_MAIN_PAGE = "<?php echo WCS_MAIN_PAGE;?>";
		var API_BASE_URL = "<?php echo API_BASE_URL;?>";
		var SHOP_INDEX = "<?php echo SHOP_INDEX;?>";
		
	</script>
</head>

	
	
<body class="init">
	<?php


	$mbr_code = $_GET['mbr_code'];
	
	
	$request_client = 'A1 Android App';
	$request_date = date( 'Y-m-d h:i:s', time() );

	if ( empty( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] ) ) {
		$IP = $_SERVER[ 'REMOTE_ADDR' ];
	} else {
		$IP = explode( ',', $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] );
		$IP = $IP[ 0 ];
	}

	$code = 'A1drivingSchool';
	$request_ip = $IP;

	$token = sha1( $request_ip . $request_date . $code );
	
	
//	$wcs_login_token = $_GET[ 't' ]; //wcs token
//	$wcs_login_token = sha1( $request_ip . $request_date . $code );//will delete this line
//	$wcs_login_token = 'abcd';//wrong token
	
	//if($token!=$wcs_login_token || !$mbr_code)
	if(!$mbr_code)
	{
		echo '<input type="hidden" id="error" value="'.ERROR_TOKEN.'">';
	}
	else
	{
		$_SESSION[ 'token' ] = $token;
		$_SESSION[ 'request_client' ] = 'A1 Android App';
		$_SESSION[ 'request_date' ] = $request_date;
		$_SESSION[ 'request_ip' ] = $request_ip;
		$_SESSION[ 'mbr_code' ] = $mbr_code;
		$_SESSION['in_time'] = time();  
	}

	?>

	<input type="hidden" id="wcs-front-page" value="<?php echo WCS_MAIN_PAGE;?>">

	
	<script type="text/javascript">
		var token = "<?php echo $token;?>";
		var request_client = "<?php echo $request_client;?>";
		var request_date = "<?php echo $request_date;?>";
		var request_ip = "<?php echo $request_ip;?>";
		var mbr_code = "<?php echo $mbr_code;?>";
	</script>




	<script type="text/javascript" src="init.bundle.js?t=<?php echo time();?>">
	</script>



</body>
</html>