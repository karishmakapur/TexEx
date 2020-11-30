<?php
	session_start();
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>TexEx Admin Login</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="adminPages.css"/>
	<link rel="icon" href="../Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="adminLogin.js"></script>
	
	<!--This script is an encryption method script-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>

<body class="loginPage">
<div class="formBackgroundLogin">
	<form action="adminLogin.php" method="post" onsubmit="return validateLogin();" id="loginForm">
		<div class="logoContainer">
			<img id="Logo" class="Logo" src="../Images/Logo.svg" alt="TexEx Logo"/>
		</div>
		<h1 class="text">Administrative Login</h1>
		<div class="fieldsContainerAdminLogin">
			<input type="email" placeholder="Email" class="EmailField" aria-label="Admin Email" id="emailField" name="emailField" required/>
			
			<input type="password" placeholder="Password" class="PasswordField" aria-label="Admin Password" id="passwordField" name="passwordField" required/>
			
			<input type="submit" value="Login" class="buttonFields" id="loginButton"/>
		</div>
	</form>
</div>
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

	//first get user inputted email address and password
	$UserInputEmail = $_POST["emailField"];
	trim($UserInputEmail);
	$UserInputEmail = stripslashes($UserInputEmail);
	$UserInputPassword = $_POST["passwordField"];
	trim($UserInputPassword);
	$UserInputPassword = stripslashes($UserInputPassword);
	
	//validation query
	$query_valid = 'SELECT Email, Password FROM tbl_admin WHERE Email LIKE "' . $UserInputEmail . '" and Password LIKE "' . $UserInputPassword . '"';
	$query_html_valid = htmlspecialchars($query_valid);
	$result_valid = mysqli_query($db, $query_valid);
	$num_fields_valid = mysqli_num_fields($result_valid);
	$num_rows_valid = mysqli_num_rows($result_valid);
	if($num_rows_valid == 0){
		print '<script type="text/javascript">';
		print 'LoginErrorMessage("An account with that email address and password does not exist. Try again.")';
		print '</script>';
		exit();
	}
	else{
		$_SESSION['sid'] = $UserInputEmail;
		print '<script type="text/javascript">';
		print 'redirectToManageUsers()';
		print '</script>';
		exit();
	}
	mysqli_close($db);
?>
</body>
</html>