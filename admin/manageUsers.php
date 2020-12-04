<?php
	session_start();
	ini_set('session.cookie_secure', 1);
	if(!isset($_SESSION["adminsid"])){
		header("location:adminLogin.php");
		exit();
	}
?>

<!DOCTYPE html>
<html lang = "en">
  <head>
    <title>Admin Manage Users</title>
	<meta charset = "utf-8">
    <link rel = "stylesheet" type = "text/css" href = "adminPages.css"/>
	<link rel="icon" href="../Images/Logo.svg" type="image/x-icon" />
    <script type="text/javascript" src = "manageUsers.js"></script>
  </head>
 
  <body class="documentBody" id="documentBody">
    <!-- Start of NAV --> 
    <div class="topNav" id="nav">
      <a href="manageUsers.php">Manage Users&nbsp;&nbsp;<img src="../Images/user_icon.svg" alt="Manage Users Icon" width="10" height="10"/></a>
      <a href="managePosts.php">Manage Posts&nbsp;&nbsp;<img src="../Images/postsIcon.svg" alt="Manage Posts Icon" width="10" height="10"/></a>
      <a href="adminLogout.php"> Logout&nbsp;&nbsp;<img src="../Images/logoutIcon.svg" alt="Logout Icon" width="10" height="10"/></a>
      <div class="logoContainer">
        <img src="../Images/adminLogo.svg" alt="TexEx Logo" height="30" width="30">
      </div>
    </div>
    <!-- End of NAV -->	
	<h1 class="searchMssg" id="searchMessage"><span class="headings">Narrow your search here!</span></h1>
	<form method="post" id="formElem">
		<div id="searchField" class="searchField">
			<input type="text" name="searchBox" id="searchBox" placeholder="Search for a user by name" class="searchBar" aria-label="Admin Search Box" value="<?php if(isset($_POST['searchBox'])) echo htmlspecialchars($_POST['searchBox']); ?>"/>
			<div class="bar">
			<input type="submit" value="Search" aria-label="Search Button" name="searchButton" id="searchButton" class="searchButton"/>
			</div>
			<div class = "bar">
				<div class="sortSearchWrapper" id="sortSearchWrapper">
					<div class="selectWrapper">
						<select aria-label="Sort Search" name="sortSearch" id="sortSearch" class="sortSearchBox" onchange="submitSort()">
							<option value="Relevance" <?PHP if($_POST['sortSearch'] == "Relevance") echo 'selected'?>>Relevance</option>
							<option value="First Name Alphabetically" <?PHP if($_POST['sortSearch'] == "First Name Alphabetically") echo 'selected'?>>First Name Alphabetically</option>
							<option value="Recent Creation Date" <?PHP if($_POST['sortSearch'] == "Recent Creation Date") echo 'selected'?>>Recent Creation Date</option>
							<option value="Oldest Creation Date" <?PHP if($_POST['sortSearch'] == "Oldest Creation Date") echo 'selected'?>>Oldest Creation Date</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		
	</form>
	<script type="text/javascript" src="manageUsersr.js"></script>
	<noscript>Your browser does not support Javascript</noscript>
	<br /><br /><br /><br /><br /><br />
	<?php
		$key = $_SERVER['QUERY_STRING'];
		if($key == "Errormessage=lock"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not lock user. Please try again later.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Errormessage=unlock"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not unlock user. Please try again later.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Successmessage=lock"){
			print '<script type="text/javascript">';
			print "notificationMessage('Successmessage', 'Success! The user\'s account has been locked.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Successmessage=unlock"){
			print '<script type="text/javascript">';
			print "notificationMessage('Successmessage', 'Success! The user\'s account has been unlocked.');";
			print "removeQueryString();";
			print '</script>';
		}
		$host =  'localhost';
		$userid =  'group2';
		$password = 'veZB9mEPGifk';
		$schema = 'group2';

		$db = new mysqli($host, $userid,  $password, $schema);
		
		if(mysqli_connect_errno()){
				print "Connect failed: " . mysqli_connect_error();
				exit();
		}
		
		$query_get_users = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Disabled = FALSE ORDER BY UserID DESC';
		$query_html_get_users = htmlspecialchars($query_get_users);
		$result_get_users = mysqli_query($db, $query_get_users);
		$num_fields_get_users = mysqli_num_fields($result_get_users);
		$num_rows_get_users = mysqli_num_rows($result_get_users);
		if($num_rows_get_users == 0){
			print "<script type='text/javascript'>";
			print "showNoUsers();";
			print "</script>";
			
		}
		else{
			$row_get_users = mysqli_fetch_assoc($result_get_users);
			for($row_num = 0; $row_num < $num_rows_get_users; $row_num++){
				$values_get_users = array_values($row_get_users);
				print "<script type='text/javascript'>";
				print "showUsers(" . json_encode($values_get_users) . ");";
				print "</script>";
				$row_get_users = mysqli_fetch_assoc($result_get_users);
			}
		}
		
		if(isset($_POST['searchButton'])){
			print "<script type='text/javascript'>";
			print "clearResults();";
			print "</script>";
			$searchBy = trim($_POST['searchBox']);
			$sortBy = $_POST['sortSearch'];
			$query_search = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Name LIKE "%' . $searchBy .'%" AND Disabled = FALSE';
			if($sortBy == "First Name Alphabetically"){
				$query_search = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Name LIKE "%' . $searchBy .'%" AND Disabled = FALSE ORDER BY Name DESC';
			}
			else if($sortBy == "Recent Creation Date"){
				$query_search = 'SELECT UserID, Email, Name, Locked, CreationDate FROM tbl_user WHERE Name LIKE "%' . $searchBy .'%" AND Disabled = FALSE ORDER BY CreationDate ASC';
			}
			else if($sortBy == "Oldest Creation Date"){
				$query_search = 'SELECT UserID, Email, Name, Locked, CreationDate FROM tbl_user WHERE Name LIKE "%' . $searchBy .'%" AND Disabled = FALSE ORDER BY CreationDate DESC';
			}
			
			
			$query_html_search = htmlspecialchars($query_search);
			$result_search = mysqli_query($db, $query_search);
			$num_fields_search = mysqli_num_fields($result_search);
			$num_rows_search = mysqli_num_rows($result_search);
			if($num_rows_search == 0){
				print "<script type='text/javascript'>";
				print "showNoUsers();";
				print "</script>";
			}
			else{
				$row_search = mysqli_fetch_assoc($result_search);
				for($row_num = 0; $row_num < $num_rows_search; $row_num++){
					$values_search = array_values($row_search);
					print "<script type='text/javascript'>";
					print "showUsers(" . json_encode($values_search) . ");";
					print "</script>";
					$row_search = mysqli_fetch_assoc($result_search);
				}
			}
		}
		$key = $_GET['key'];
		$lockedVal = $_GET['locked'];
		if(isset($_POST['submitBtn' . $key])){
			if($lockedVal == "on"){
				$query_lock = 'UPDATE tbl_user SET Locked = TRUE WHERE UserID = ' . $key;
				$query_html_lock = htmlspecialchars($query_lock);
				$result_lock = mysqli_query($db, $query_lock);
				$refreshQueryString = 'manageUsers.php';
				if(!$result_lock){
					$refreshQueryString = $refreshQueryString . "?Errormessage=lock";
					
				}
				else{
					$refreshQueryString = $refreshQueryString . "?Successmessage=lock";
					
				}
				$query_lock_manages = 'SELECT * FROM tbl_manages WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '") AND UserID = ' . $key;
				$query_html_lock_manages = htmlspecialchars($query_lock_manages);
				$result_lock_manages = mysqli_query($db, $query_lock_manages);
				$num_fields_lock_manages = mysqli_num_fields($result_lock_manages);
				$num_rows_lock_manages = mysqli_num_rows($result_lock_manages);
				if($num_rows_lock_manages == 0){
					$query_add = 'INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
								VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '"), ' . $key .', "Locked Account", now())';
				
					$query_html_add = htmlspecialchars($query_add);
					$result_add = mysqli_query($db, $query_add);
					if(!$result_add){
						$refreshQueryString = $refreshQueryString . "?Errormessage=lock";
					}
				}
				else if($num_rows_lock_manages > 0){
					$query_update = 'UPDATE tbl_manages SET ActionTaken = "Locked Account", ActionDate = now()
									WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid']. '")
									AND UserID = ' . $key;
					$query_html_update = htmlspecialchars($query_update);
					$result_update = mysqli_query($db, $query_update);
					if(!$result_update){
						$refreshQueryString = $refreshQueryString . "?Errormessage=lock";
					}
				}
				print "<script type='text/javascript'>";
				print "window.open('" . $refreshQueryString . "', '_self');";
				print "</script>";
			}
			else if($lockedVal == "off"){
				$query_lock = 'UPDATE tbl_user SET Locked = FALSE WHERE UserID = ' . $key;
				$query_html_lock = htmlspecialchars($query_lock);
				$result_lock = mysqli_query($db, $query_lock);
				$refreshQueryString = 'manageUsers.php';
				if(!$result_lock){
					$refreshQueryString = $refreshQueryString . "?Errormessage=unlock";
					
				}
				else{
					$refreshQueryString = $refreshQueryString . "?Successmessage=unlock";
					
				}
				$query_lock_manages = 'SELECT * FROM tbl_manages WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '") AND UserID = ' . $key;
				$query_html_lock_manages = htmlspecialchars($query_lock_manages);
				$result_lock_manages = mysqli_query($db, $query_lock_manages);
				$num_fields_lock_manages = mysqli_num_fields($result_lock_manages);
				$num_rows_lock_manages = mysqli_num_rows($result_lock_manages);
				if($num_rows_lock_manages == 0){
					$query_add = 'INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
								VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '"), ' . $key .', "Unlocked Account", now())';
				
					$query_html_add = htmlspecialchars($query_add);
					$result_add = mysqli_query($db, $query_add);
					if(!$result_add){
						$refreshQueryString = $refreshQueryString . "?Errormessage=unlock";
					}
				}
				else if($num_rows_lock_manages > 0){
					$query_update = 'UPDATE tbl_manages SET ActionTaken = "Unlocked Account", ActionDate = now()
									WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid']. '")
									AND UserID = ' . $key;
					$query_html_update = htmlspecialchars($query_update);
					$result_update = mysqli_query($db, $query_update);
					if(!$result_update){
						$refreshQueryString = $refreshQueryString . "?Errormessage=unlock";
					}
				}
				print "<script type='text/javascript'>";
				print "window.open('" . $refreshQueryString . "', '_self');";
				print "</script>";
			}
		}
		mysqli_close($db);
	?>
  </body>
  
</html>
