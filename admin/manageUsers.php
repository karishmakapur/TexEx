<?php
	session_start();
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
    <div class="topNav">
      <a href="manageUsers.php">Manage Users&nbsp;&nbsp;<img src="../Images/user_icon.svg" alt="Manage Users Icon" width="10" height="10"/></a>
      <a href="managePosts.php">Manage Posts&nbsp;&nbsp;<img src="../Images/postsIcon.svg" alt="Manage Posts Icon" width="10" height="10"/></a>
      <a href="adminLogout.php"> Logout&nbsp;&nbsp;<img src="../Images/logoutIcon.svg" alt="Logout Icon" width="10" height="10"/></a>
      <div class="logoContainer">
        <img src="../Images/adminLogo.svg" alt="TexEx Logo" height="30" width="30">
      </div>
    </div>
    <!-- End of NAV -->	
	<h1 class="searchMssg" id="searchMessage"><span class="headings">Narrow your search here!</span></h1>
	<form method="post">
		<div id="searchField" class="searchField">
			<input type="search" name="searchBox" id="searchBox" placeholder="Search for a user by name" class="searchBar" aria-label="Admin Search Box" value="<?php if(isset($_POST['searchBox'])) echo htmlspecialchars($_POST['searchBox']); ?>"/>
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
    <div class="tableContainer" id="tableCon">
        <!--<script type="text/javascript">displayUsers();</script>
		<noscript>Your browser does not support JavaScript</noscript>-->
		
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
		
		$query_get_users = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Disabled = FALSE';
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
			$searchBy = $_POST['searchBox'];
			$sortBy = $_POST['sortSearch'];
			
			
			$query_search = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Name LIKE "' . $searchBy .'%"';
			if($sortBy == "First Name Alphabetically"){
				$query_search = 'SELECT UserID, Email, Name, Locked FROM tbl_user WHERE Name LIKE "' . $searchBy .'%" ORDER BY Name DESC';
			}
			else if($sortBy == "Recent Creation Date"){
				$query_search = 'SELECT UserID, Email, Name, Locked, CreationDate FROM tbl_user WHERE Name LIKE "' . $searchBy .'%" ORDER BY CreationDate ASC';
			}
			else if($sortBy == "Oldest Creation Date"){
				$query_search = 'SELECT UserID, Email, Name, Locked, CreationDate FROM tbl_user WHERE Name LIKE "' . $searchBy .'%" ORDER BY CreationDate DESC';
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
		?>
    </div>
  </body>
  
</html>
