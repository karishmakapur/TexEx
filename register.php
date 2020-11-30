<?php
	session_start();
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>TexEx Register</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="welcomeRegisterLogin.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="register.js"></script>
	<!--This script is an encryption method script-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>

<body>
	<div class="formBackgroundRegister">
		<form action="register.php" method="post" onsubmit="return validateCreateAccount();" id="loginForm">
			<div class="logoContainer">
				<img id="Logo" class="Logo" src="Images/Logo.svg" alt="TexEx Logo"/>
			</div>
			<h1 class="text">Register</h1>
			<div class="fieldsContainerRegister">
				<input type="text" placeholder="Name" class="NameField" id="nameField" name="nameField" aria-label="Your Name" pattern="^[A-Za-z]+( [A-Za-z]+)*$" required/>
				<input type="email" placeholder="Email" class="EmailField" id="emailField" name="emailField" aria-label="Your Email" required/>
				<input type="text" placeholder="School" class="SchoolField" id="schoolField" name="schoolField" aria-label="Your School" pattern="[A-Za-z, ]*([Uu]niversity|[Cc]ollege)([A-Za-z]*,? ?)*" required/>
				<input type="password" placeholder="Password" class="UnlockPasswordField" name="passwordField" id="passwordField" aria-label="Your Password" pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required/>
				<input type="password" placeholder="Confirm Password" class="PasswordField" aria-label="Confirm Your Password" name="confirmpasswordField" id="confirmpasswordField" required/>

				<input type="submit" value="Create Account" class="buttonFields" name="registerButton" id="createAccountButton"/>
			</div>
			<div class="linkContainer">
				<a class="redirectLink" href="login.php">Already have an account? Login!</a>
			</div>
		</form>
		<script type="text/javascript" src="registerr.js"></script>
	<noscript>Your browser does not support JavaScript</noscript>
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

	//first get user inputted fields
	if(isset($_POST['registerButton'])){
		$UserInputName = $_POST["nameField"];
		$UserInputEmail = $_POST["emailField"];
		$UserInputSchool = $_POST["schoolField"];
		$UserInputPassword = $_POST["passwordField"];
		
		trim($UserInputName);
		$UserInputName = stripslashes($UserInputName);
		trim($UserInputEmail);
		$UserInputEmail = stripslashes($UserInputEmail);
		trim($UserInputSchool);
		$UserInputSchool = stripslashes($UserInputSchool);
		trim($UserInputPassword);
		$UserInputPassword = stripslashes($UserInputPassword);
		
		//first check if user with email already exists
		$query_exists = 'SELECT Email FROM tbl_user WHERE Email LIKE "' . $UserInputEmail . '"';
		$query_html_exists = htmlspecialchars($query_exists);
		$result_exists = mysqli_query($db, $query_exists);
		$num_fields_exists = mysqli_num_fields($result_exists);
		$num_rows_exists = mysqli_num_rows($result_exists);
		if($num_rows_exists != 0){
			print '<script type="text/javascript">';
			print 'AccountErrorMessage("This email already has an account.")';
			print '</script>';
			exit();
		}
		else{
			//register a record
			$query_register = 'INSERT INTO tbl_user(Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate) VALUES ("'. $UserInputName . '", "' . $UserInputEmail . '", "' . $UserInputPassword . '", NULL, "' . $UserInputSchool . '", FALSE, FALSE, now(), NULL)';
			$query_html_register = htmlspecialchars($query_register);
			$result_register = mysqli_query($db, $query_register);
			if($result_register){
				$_SESSION['sid'] = $UserInputEmail;
				print '<script type="text/javascript">';
				print 'redirectToSearch()';
				print '</script>';
				exit();
			}
			else{
				print '<script type="text/javascript">';
				print 'AccountErrorMessage("Unable to create account. Please try again later.")';
				print '</script>';
				exit();
			}
		}
	}
	mysqli_close($db);
	?>
</body>
</html>