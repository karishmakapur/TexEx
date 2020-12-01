<?php
	session_start();
	$_SESSION['sid'] = NULL;
	if($_SESSION['sid'] == NULL){
		header("location:login.php");
	}
	else{
		header("location:search.php");
	}
?>