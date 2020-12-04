<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	$_SESSION['adminsid'] = NULL;
	if($_SESSION['adminsid'] == NULL){
		header("location:adminLogin.php");
	}
	else{
		header("location:manageUsers.php");
	}
?>