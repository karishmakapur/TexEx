<?php
	session_start();
	if(!isset($_SESSION["sid"])){
		header("location:login.php");
		exit();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Account Information</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="userPages.css">
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="accountInfo.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>

<body>
	<!--Start of NAV -->
	<div id="nav" class="topnav">
		<a href="search.php">Search&nbsp;&nbsp;<img src="Images/searchIcon.svg" alt="Search Icon" width="10" height="10"/></a>
		<a href="sell.php">Sell&nbsp;&nbsp;<img src="Images/sellIcon.svg" alt="Sell Icon" width="10" height="10"/></a>
		<a href="myPosts.php">My Posts&nbsp;&nbsp;<img src="Images/postsIcon.svg" alt="Post Icon" width="10" height="10"/></a>
		<a href="accountInfo.php">Account&nbsp;&nbsp;<img src="Images/accountIcon.svg" alt="Account Icon" width="10" height="10"/></a>
		<a href="login.php">Logout&nbsp;&nbsp;<img src="Images/logoutIcon.svg" alt="Logout Icon" width="10" height="10"/></a>
		<div>
			<img src="Images/Logo.svg" alt="TexEx Logo" width="30" height="30"/>
		</div>
	</div>
	<!-- End of NAV -->

    <!-- Start of container (holds and positions elements) -->
	<h1><span class="text">View your Account!</span></h1>
    <div class="container">
        <!-- Start of account information form -->
        <div class="formsContainer">
			<div>
				<h2 id="AccountInfo">My Account Information</h2>
			</div>
			<div class="fieldsContainer" id="fieldsContainer">
				<input type="text" placeholder="Your Name..." class="NameField" id="nameField" name="nameField" aria-label="Your Name" pattern="^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$" value="<?php if(isset($_POST['nameField'])) echo htmlspecialchars($_POST['nameField']); ?>"/>
				<input type="email" placeholder="Your Email..." class="EmailField" id="emailField" name="emailField" aria-label="Your Email" value="<?php if(isset($_POST['emailField'])) echo htmlspecialchars($_POST['emailField']); ?>"/>
				<input type="text" placeholder="Your School..." class="SchoolField" id="schoolField" name="schoolField" aria-label="Your School" pattern="^[A-Z]{1}[a-z]+( [A-Z]{1}[a-z]+)*$" value="<?php if(isset($_POST['schoolField'])) echo htmlspecialchars($_POST['schoolField']); ?>"/>

				<input type="button" value="Update Password" class="buttonFields" id="updatePasswordButton"/>
				<input type="button" value="Update Account" class="buttonFields" id="updateAccountButton"/>
				<input type="button" value="Disable Account" class="buttonFields" id="disableAccountButton"/>
			</div>
           <script type="text/javascript" src="accountInfor.js"></script>
            <noscript>Your browser does not support JavaScript</noscript>
        </div>
        <!-- End of account information form -->

        <!-- Start of saved searches -->
        <div class="formsContainer" id="searches">
            <div>
                <h2>My Saved Searches</h2>
             </div>
            <!--script type="text/javascript">displaySavedSearch();</script>
            <noscript>Your browser does not support JavaScript</noscript>-->
        </div>
        <!-- End of saved searches -->	
        
    </div>
    <!-- End of container -->  

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
		
		$query_get_user_info = 'SELECT Name, Email, School FROM tbl_user WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $_SESSION['sid'] . '") AND Disabled = FALSE';
		$query_html_get_user_info = htmlspecialchars($query_get_user_info);
		$result_get_user_info = mysqli_query($db, $query_get_user_info);
		$num_fields_get_user_info = mysqli_num_fields($result_get_user_info);
		$num_rows_get_user_info = mysqli_num_rows($result_get_user_info);
		$row_get_user_info = mysqli_fetch_assoc($result_get_user_info);
		if($num_rows_get_user_info == 1){
			$row_get_user_info = array_values($row_get_user_info);
			print '<script type="text/javascript">';
			print 'displayAccount(' . json_encode($row_get_user_info) . ')';
			print '</script>';
		}
		
		$query_get_saved_searches = 'SELECT SearchID, SearchType, SearchTerm FROM tbl_saved_search WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $_SESSION['sid'] . '" AND Disabled = FALSE) as x)';
		print $query_get_saved_searches;
		$query_html_get_saved_searches = htmlspecialchars($query_get_saved_searches);
		$result_get_saved_searches = mysqli_query($db, $query_get_saved_searches);
		$num_fields_get_saved_searches = mysqli_num_fields($result_get_saved_searches);
		$num_rows_get_saved_searches = mysqli_num_rows($result_get_saved_searches);
		$row_get_saved_searches = mysqli_fetch_assoc($result_get_saved_searches);
		if($row_get_saved_searches == 0){
			print '<script type="text/javascript">';
			print 'noSavedSearches()';
			print '</script>';
		}
		else{
			for($row_num = 0; $row_num < $num_rows_get_saved_searches; $row_num++){
				$values_get_saved_searches = array_values($row_get_saved_searches);
				print '<script type="text/javascript">';
				print 'displaySavedSearch('.json_encode($values_get_saved_searches).')';
				print '</script>';
				$row_get_saved_searches = mysqli_fetch_assoc($result_get_saved_searches);
			}
		}
	?>
</body>
</html>
