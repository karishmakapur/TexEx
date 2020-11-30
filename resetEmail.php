<!DOCTYPE html>
<html lang="en">
<head>
	<title>TexEx Login</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="welcomeRegisterLogin.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="login.js"></script>
	
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
if(isset($_POST['submitButton'])){
	$recipientEmail = $$_POST['submitButton'];
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

	$emailHeaders = "Cc: Replace email address" . "\r\n";
	$emailHeaders .= "Bcc: Replace email address" . "\r\n";

	$fromAddress = "-fpostmaster@localhost";
	$emailStatus = mail($recipientEmail, $emailSubject, $emailContext, $emailHeaders, $fromAddress);
	if($emailStatus) {
	echo "EMail Sent Successfully!";
	} else {
	echo "No Email is sent";
	}
}
?>
</html>

