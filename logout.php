<?php
	session_start();
	$_SESSION = array();
	
	if(session_destroy()){
		header("location:login.php");
	}
	else{
		header("location:search.php");
	}
?>