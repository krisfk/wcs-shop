<?php
include 'config.php';
$err = $_POST['err'];

switch($err)
{
	case ERROR_TIMEOUT:
		echo 'sim_session_timeout';
		break;
		
	case ERROR_TOKEN:
		echo 'sim_invalid_token';
		break;
	case ERROR_MAIN:
		echo 'sim_maintenance';
		break;
}

?>