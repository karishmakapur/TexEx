<?php
	session_start();
	$_SESSION['adminsid'] = NULL;
	if($_SESSION['adminsid'] == NULL){
		header("location:adminLogin.php");
	}
	else{
		header("location:manageUsers.php");
	}
?>