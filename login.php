<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	
?>
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
	<form action="login.php" method="post" id="loginForm" onsubmit="return encryptPass();">
		<div class="logoContainer">
			<img id="Logo" class="Logo" src="Images/Logo.svg" alt="TexEx Logo"/>
		</div>
		<h1 class="text">Login</h1>
		<div class="fieldsContainerLogin">
			<input type="email" placeholder="Email Address" class="EmailField" id="emailField" name="emailField" aria-label="Your Email Address" value="<?php if(isset($_POST['emailField'])) echo htmlspecialchars($_POST['emailField']);?>" required/>
			
			<input type="password" placeholder="Password" class="PasswordField" id="passwordField" name="passwordField" aria-label="Your Password" required/>
			
			<input type="submit" value="Login" class="buttonFields" name="submitButton" id="loginButton"/>
		</div>
		<div class="linkContainer">
			<a class="redirectLink" href="forgotPassword.php">Forgot Password?</a>
			<br /><br />
			<a class="redirectLink" href="register.php">Don't have an account? Get Started!</a>
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

	//first get user inputted email address and password
	if(isset($_POST['submitButton'])){
		$UserInputEmail = trim($_POST["emailField"]);
		$UserInputEmail = stripslashes($UserInputEmail);
		$UserInputPassword = $_POST["passwordField"];
		$UserInputPassword = stripslashes($UserInputPassword);
		
		//validation query
		$query_valid = 'SELECT Email, Password FROM tbl_user WHERE Email LIKE "' . $UserInputEmail . '" and Password LIKE "' . $UserInputPassword . '"';
		$query_html_valid = htmlspecialchars($query_valid);
		$result_valid = mysqli_query($db, $query_valid);
		$num_fields_valid = mysqli_num_fields($result_valid);
		$num_rows_valid = mysqli_num_rows($result_valid);
		if($num_rows_valid == 0){
			print '<script type="text/javascript">';
			print 'LoginErrorMessage("An account with that email address and password does not exist. Try again.");';
			print '</script>';
			exit();
		}
		else{
			//disabled query
			$query_disabled = 'SELECT Disabled FROM tbl_user WHERE Email LIKE "' . $UserInputEmail . '" and Password LIKE "' . $UserInputPassword . '"';
			$query_html_disabled = htmlspecialchars($query_disabled);
			$result_disabled = mysqli_query($db, $query_disabled);
			$num_fields_disabled = mysqli_num_fields($result_disabled);
			$num_rows_disabled = mysqli_num_rows($result_disabled);
			if($num_rows_disabled > 0){
				$row_disabled = mysqli_fetch_assoc($result_disabled);
				$values_disabled = array_values($row_disabled);
				if($values_disabled[0] == 1){
					print '<script type="text/javascript">';
					print 'LoginErrorMessage("Your account has been disabled. You are no longer able to access it.");';
					print '</script>';
					exit();
				}
				else{
					//locked query
					$query_locked = 'SELECT Locked FROM tbl_user WHERE Email LIKE "' . $UserInputEmail . '" and Password LIKE "' . $UserInputPassword . '"';
					$query_html_locked = htmlspecialchars($query_locked);
					$result_locked = mysqli_query($db, $query_locked);
					$num_fields_locked = mysqli_num_fields($result_locked);
					$num_rows_locked = mysqli_num_rows($result_locked);
					if($num_rows_locked > 0){
						$row_locked = mysqli_fetch_assoc($result_locked);
						$values_locked = array_values($row_locked);
						if($values_locked[0] == 1){
							print '<script type="text/javascript">';
							print 'LoginErrorMessage("Your account has been locked. Contact TexEx at (760)000-0000 for further assistance.");';
							print '</script>';
							exit();
						}
					}
				}
			}
			
			//if account exists, and it's not disabled or locked, then allow them into the site.
			$_SESSION['sid'] = $UserInputEmail;
			print '<script type="text/javascript">';
			print 'redirectToSearch();';
			print '</script>';
			exit();
		}
	}
	mysqli_close($db);
?>
</body>
</html>