<?php
	session_start();
	ini_set('session.cookie_secure', 1);
	$_SESSION['sid'] = NULL;
	if($_SESSION['sid'] == NULL || $_SESSION['sid'] == 'disabled' ){
		header("location:login.php");
	}
	else{
		header("location:search.php");
	}
?>