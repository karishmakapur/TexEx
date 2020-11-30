<!DOCTYPE html>
<html lang="en">
<head>
	<title>TexEx Forgot Password</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="welcomeRegisterLogin.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="resetEmail.js"></script>
	
	<!--This script is an encryption method script-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>
<body>
	<div class="formBackground">
	<form method="post" id="resetForm">
		<div class="logoContainer">
			<img id="Logo" class="Logo" src="Images/Logo.svg" alt="TexEx Logo">
		</div>
		<h1 class="text">Forgot Password</h1>
		<div class="fieldsContainerLogin">
			<input type="email" placeholder="Email Address" class="EmailField" id="emailField" name="emailField" aria-label="Your Email Address" required/>

			<input type="submit" value="Send Forgot Password Email" class="buttonFields" name="submitButton" id="loginButton"/>
		</div>
		<div class="linkContainer">
			<a class="redirectLink" href="login.php">Go back to Login</a>
		</div>
	</form>
</div>
</body>
<?php
	$host =  'db';
	$userid =  'user';
	$password = 'test';
	$schema = 'myDb';

	$db = new mysqli($host, $userid,  $password, $schema);
	
	if(mysqli_connect_errno()){
			print "Connect failed: " . mysqli_connect_error();
			exit();
	}
	if(isset($_POST['submitButton'])){
		$recipientEmail = $_POST['emailField'];
		
		//check if email address exists
		$query_exists = 'SELECT Email FROM tbl_user WHERE Email LIKE "' . $recipientEmail . '"';
		$query_html_exists = htmlspecialchars($query_exists);
		$result_exists = mysqli_query($db, $query_exists);
		if(!$result_exists){
			exit();
		}
		$num_fields_exists = mysqli_num_fields($result_exists);
		$num_rows_exists = mysqli_num_rows($result_exists);
		if($num_rows_exists == 0){
			print "<script type=text/javascript>";
			print "message('The entered email address does not have an account!')";
			print "</script>";
			exit();
		}
		
		//generate password
		$temporaryPass = generate_password(8);
		
		$emailSubject = "TexEx: Forgot Password";
			
		$message = "
		<html>
		<head>
		<title>TexEx: Forgot Password</title>
		</head>
		<body>
		<p>If you do not have a TexEx account, please ignore this email.</p>
		<p>Your temporary TexEx password is: " . $temporaryPass . "</p>
		<p>Login to your TexEx account with the password provided. </p>
		<p>If you would like to change your password, navigate to the Account Information page in your TexEx account. </p>
		</body>
		</html>
		";

		// Always set content-type when sending HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From: <texex.noreply@gmail.com>' . "\r\n";
		
		$emailStatus = mail($recipientEmail, $emailSubject, $message, $headers);
		if($emailStatus) {
			print "<script type=text/javascript>";
			print "message('Email Sent Successfully!')";
			print "</script>";
		} 
		else {
			print "<script type=text/javascript>";
			print "message('Email was not able to be sent! Please try again later.')";
			print "</script>";
		}
	}

function generate_password($chars) {
	$data = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz';
	return substr(str_shuffle($data), 0, $chars);
}
?>
</html>

