<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	$_SESSION['sid'] = NULL;
	if($_SESSION['sid'] == NULL || $_SESSION['sid'] == 'disabled' ){
		header("location:login.php");
	}
	else{
		header("location:search.php");
	}
?>