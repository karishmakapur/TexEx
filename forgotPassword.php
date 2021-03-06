<!DOCTYPE html>
<html lang="en">
<head>
	<title>TexEx Forgot Password</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="welcomeRegisterLogin.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="forgotPassword.js"></script>
	
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
				<input type="email" placeholder="Email Address" class="EmailField" id="emailField" name="emailField" aria-label="Your Email Address" value="<?php if(isset($_POST['emailField'])) echo htmlspecialchars($_POST['emailField']); ?>" required/>
				<input type="hidden" id="pass" name="pass" />
				<input type="hidden" id="encryptpass" name="encryptpass" />
				<input type="button" value="Send Forgot Password Email" class="buttonFields" name="sendButton" id="sendButton" onclick="generate_password(8)"/>
				<input type="submit" value="Send Forgot Password Email" class="passButton" name="submitButton" id="loginButton"/>
			</div>
			<div class="linkContainer">
				<a class="redirectLink" href="login.php">Go back to Login</a>
			</div>
		</form>
	</div>
	<?php
	$host =  'localhost';
	$userid =  'group2';
	$password = 'veZB9mEPGifk';
	$schema = 'group2';


	$db = new mysqli($host, $userid,  $password, $schema);
	
	if(mysqli_connect_errno()){
			print "Connect failed: " . mysqli_connect_error();
			exit();
	}
	if(isset($_POST['submitButton'])){
		$recipientEmail = trim($_POST['emailField']);
		
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
			print "message('The entered email address does not have an account!');";
			print "</script>";
			exit();
		}
		
		//generate password
		$temporaryPass = $_POST['pass'];
		
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
			
		
			$encrypt = $_POST['encryptpass'];
			$query_change = 'UPDATE tbl_user SET Password = "' . $encrypt . '" WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $recipientEmail . '") as x)';
			$query_html_change = htmlspecialchars($query_change);
			$result_change = mysqli_query($db, $query_change);
			if(!result_change){
				print "<script type=text/javascript>";
				print "message('Temporary Password was not able to be generated. Please try again later.');";
				print "</script>";
			}
			else{
				print "<script type=text/javascript>";
				print "message('The temporary password was successfully sent to your email.');";
				print "</script>";
			}
		} 
		else {
			print "<script type=text/javascript>";
			print "message('Email was not able to be sent! Please try again later.');";
			print "</script>";
		}
	}

?>
</body>
</html>

