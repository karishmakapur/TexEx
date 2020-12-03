<?php
	session_start();
	$_SESSION['sid'] = NULL;
	if($_SESSION['sid'] == NULL || $_SESSION['sid'] == 'disabled' ){
		header("location:login.php");
	}
	else{
		header("location:search.php");
	}
?>