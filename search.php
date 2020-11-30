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
	<title>Search for a book</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="userPages.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="search.js"></script>
</head>

<body>
	
	<!--Start of NAV -->
	<div class="topnav">
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
	
	<!--Search bar -->
		<h1><span class="text">Search for a book!</span></h1>
		<form method="post">
			<div class="searchBarWrapper" id="searchWrapper">
				
					<div class="selectWrapper">
						<select aria-label="Search By Options" name="searchType" id="searchType" class="selectBox">
							<option value="Choose a field" disabled>Any Field</option>
							<option value="BookAuthor" <?PHP if($_POST['searchType'] == "BookAuthor") echo 'selected'?>>Author</option>
							<option value="BookISBN" <?PHP if($_POST['searchType'] == "BookISBN") echo 'selected'?>>ISBN</option>
							<option value="BookTitle" <?PHP if($_POST['searchType'] == "BookTitle") echo 'selected'?>>Title</option>
						</select>
					</div>
					<div class="bar">
						<input type="text" placeholder="Book Title, Author, ISBN" name="searchBar" aria-label="Search by Book Title, Author, ISBN" id="searchBar" class="searchBar" value="<?php if(isset($_POST['searchBar'])) echo htmlspecialchars($_POST['searchBar']); ?>"/>
					</div>
					
					<div class="bar">
						<input type="submit" value="Search" aria-label="Search Button" name="searchButton" id="searchButton" class="searchButton"/>
					</div>
					<div class="saveSearch">
						<label>
						<input type="checkbox" name="saveSearch" id="saveSearch" onclick="submitForm()" <?php if($_POST['saveSearch'] == "on"){echo 'checked';} ?>/>Save Search?
						</label>
						<input type="hidden" name="unsaveSearch" id="unsaveSearch" <?php if($_POST['saveSearch'] == "off"){echo 'checked';} ?> />
					</div>
			</div>
			<div class="sortSearchWrapper" id="sortSearchWrapper">
				<div class="selectWrapper">
					<select aria-label="Sort Search" name="sortSearch" id="sortSearch" class="sortSearchBox" onchange="submitSort()">
						<option value="Relevance" <?PHP if($_POST['sortSearch'] == "Relevance") echo 'selected'?>>Relevance</option>
						<option value="Recently Posted" <?PHP if($_POST['sortSearch'] == "Recently Posted") echo 'selected'?>>Recently Posted</option>
						<option value="Oldest" <?PHP if($_POST['sortSearch'] == "Oldest") echo 'selected'?>>Oldest Posts First</option>
						<option value="ASCTitle" <?PHP if($_POST['sortSearch'] == "ASCTitle") echo 'selected'?>>By Title</option>
						<option value="ASCAuthor" <?PHP if($_POST['sortSearch'] == "ASCAuthor") echo 'selected'?>>By Author</option>
					</select>
				</div>
			</div>
			</form>
			
	<?php
		$key = $_SERVER['QUERY_STRING'];
		if($key != ""){
			print '<script type="text/javascript">';
			print 'displaySearch()';
			print '</script>';
		}
		$host =  'db';
		$userid =  'user';
		$password = 'test';
		$schema = 'myDb';

		$db = new mysqli($host, $userid,  $password, $schema);
		
		if(mysqli_connect_errno()){
				print "Connect failed: " . mysqli_connect_error();
				exit();
		}
		
		if(isset($_POST["searchButton"])){
			print '<script type="text/javascript">';
			print 'deleteResults()';
			print '</script>';
			$searchTerm = $_POST["searchBar"];
			$searchType = $_POST["searchType"];
			$savedSearch = $_POST["saveSearch"];
			$unsavedSearch = $_POST["unsaveSearch"];
			print '<script type="text/javascript">';
			print 'showSort()';
			print '</script>';
			if($savedSearch == "on"){
				$query_search_exists = 'SELECT * FROM tbl_saved_search WHERE UserID = (SELECT UserID From tbl_user WHERE  Email LIKE "'. $_SESSION['sid'] .'") AND SearchType LIKE "' . $searchType . '" AND SearchTerm LIKE "' . $searchTerm . '"';
				$query_html_search_exists = htmlspecialchars($query_search_exists);
				$result_search_exists = mysqli_query($db, $query_search_exists);
				$num_fields_search_exists = mysqli_num_fields($result_search_exists);
				$num_rows_search_exists = mysqli_num_rows($result_search_exists);
				if($num_rows_search_exists <= 0){
						
					$query_save_search = 'INSERT INTO tbl_saved_search(UserID, SearchType, SearchTerm) VALUES ((SELECT UserID From tbl_user WHERE Email LIKE "'. $_SESSION['sid'] .'"), "' . $searchType . '", "' . $searchTerm . '")';
					$query_html_save_search = htmlspecialchars($query_save_search);
					$result_save_search = mysqli_query($db, $query_save_search);
					if(!$result_save_search){
						print '<script type="text/javascript">';
						print 'alert("Unable to save your search. Please try again.")';
						print '</script>';
					}
				}
				
			}
			else if($unsavedSearch == "on"){
						$query_unsave_search = 'DELETE FROM tbl_saved_search WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE "'. $_SESSION['sid'] .'") AND SearchType LIKE "' . $searchType . '" AND SearchTerm LIKE "' . $searchTerm . '"';
						$query_html_unsave_search = htmlspecialchars($query_unsave_unsearch);
						$result_unsave_search = mysqli_query($db, $query_unsave_search);
						if(!$result_unsave_search){
							print '<script type="text/javascript">';
							print 'alert("Unable to unsave your search. Please try again.")';
							print '</script>';
						}
			}

			$searchBy = $_POST['sortSearch'];
			if($searchBy == 'Relevance'){
				print '<script type="text/javascript">';
				print 'deleteResults()';
				print '</script>';
				$query_SearchByRelevance = 'SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent FROM tbl_book_post WHERE ' . $searchType . ' LIKE "%' . $searchTerm . '%" AND PostVisible = TRUE';
				$query_html_SearchByRelevance = htmlspecialchars($query_SearchByRelevance);
				$result_SearchByRelevance = mysqli_query($db, $query_SearchByRelevance);
				$num_fields_SearchByRelevance = mysqli_num_fields($result_SearchByRelevance);
				$num_rows_SearchByRelevance = mysqli_num_rows($result_SearchByRelevance);
				$row_SearchByRelevance = mysqli_fetch_assoc($result_SearchByRelevance);
				if($num_rows_SearchByRelevance == 0){
					print '<script type="text/javascript">';
					print 'displayNoResults()';
					print '</script>';
				}
				else{
					for($row_num = 0; $row_num < $num_rows_SearchByRelevance; $row_num++){
						$values_SearchByRelevance = array_values($row_SearchByRelevance);
						print '<script type="text/javascript">';
						print 'displayResults('.json_encode($values_SearchByRelevance).')';
						print '</script>';
						$row_SearchByRelevance = mysqli_fetch_assoc($result_SearchByRelevance);
					}
				}
			}
			else if($searchBy == 'Recently Posted'){
				print '<script type="text/javascript">';
				print 'deleteResults()';
				print '</script>';
				$query_searchByRecent = 'SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent, PostedStamp FROM tbl_book_post WHERE ' . $searchType . ' LIKE "%' . $searchTerm . '%" AND PostVisible = TRUE ORDER BY PostedStamp ASC';
				$query_html_searchByRecent = htmlspecialchars($query_searchByRecent);
				$result_searchByRecent = mysqli_query($db, $query_searchByRecent);
				$num_fields_searchByRecent = mysqli_num_fields($result_searchByRecent);
				$num_rows_searchByRecent = mysqli_num_rows($result_searchByRecent);
				$row_searchByRecent = mysqli_fetch_assoc($result_searchByRecent);
				if($num_rows_searchByRecent == 0){
					print '<script type="text/javascript">';
					print 'displayNoResults()';
					print '</script>';
				}
				else{
					for($row_num = 0; $row_num < $num_rows_searchByRecent; $row_num++){
						$values_searchByRecent = array_values($row_searchByRecent);
						print '<script type="text/javascript">';
						print 'displayResults('.json_encode($values_searchByRecent).')';
						print '</script>';
						$row_searchByRecent = mysqli_fetch_assoc($result_searchByRecent);
					}
				}
			}
			else if ($searchBy == 'ASCTitle'){
				print '<script type="text/javascript">';
				print 'deleteResults()';
				print '</script>';
				$query_searchByASC = 'SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent FROM tbl_book_post WHERE ' . $searchType . ' LIKE "%' . $searchTerm . '%" AND PostVisible = TRUE ORDER BY BookTitle DESC';
				$query_html_searchByASC = htmlspecialchars($query_searchByASC);
				$result_searchByASC = mysqli_query($db, $query_searchByASC);
				$num_fields_searchByASC = mysqli_num_fields($result_searchByASC);
				$num_rows_searchByASC = mysqli_num_rows($result_searchByASC);
				$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
				if($num_rows_searchByASC == 0){
					print '<script type="text/javascript">';
					print 'displayNoResults()';
					print '</script>';
				}
				else{
					for($row_num = 0; $row_num < $num_rows_searchByASC; $row_num++){
						$values_searchByASC = array_values($row_searchByASC);
						print '<script type="text/javascript">';
						print 'displayResults('.json_encode($values_searchByASC).')';
						print '</script>';
						$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
					}
				}
			}
			else if ($searchBy == 'ASCAuthor'){
				print '<script type="text/javascript">';
				print 'deleteResults()';
				print '</script>';
				$query_searchByASC = 'SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent FROM tbl_book_post WHERE ' . $searchType . ' LIKE "%' . $searchTerm . '%" AND PostVisible = TRUE ORDER BY BookAuthor DESC';
				$query_html_searchByASC = htmlspecialchars($query_searchByASC);
				$result_searchByASC = mysqli_query($db, $query_searchByASC);
				$num_fields_searchByASC = mysqli_num_fields($result_searchByASC);
				$num_rows_searchByASC = mysqli_num_rows($result_searchByASC);
				$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
				if($num_rows_searchByASC == 0){
					print '<script type="text/javascript">';
					print 'displayNoResults()';
					print '</script>';
				}
				else{
					for($row_num = 0; $row_num < $num_rows_searchByASC; $row_num++){
						$values_searchByASC = array_values($row_searchByASC);
						print '<script type="text/javascript">';
						print 'displayResults('.json_encode($values_searchByASC).')';
						print '</script>';
						$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
					}
				}
			}
			else if($searchBy == 'Oldest'){
				print '<script type="text/javascript">';
				print 'deleteResults()';
				print '</script>';
				$query_searchByASC = 'SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent, PostedStamp FROM tbl_book_post WHERE ' . $searchType . ' LIKE "%' . $searchTerm . '%" AND PostVisible = TRUE ORDER BY PostedStamp DESC';
				$query_html_searchByASC = htmlspecialchars($query_searchByASC);
				$result_searchByASC = mysqli_query($db, $query_searchByASC);
				$num_fields_searchByASC = mysqli_num_fields($result_searchByASC);
				$num_rows_searchByASC = mysqli_num_rows($result_searchByASC);
				$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
				if($num_rows_searchByASC == 0){
					print '<script type="text/javascript">';
					print 'displayNoResults()';
					print '</script>';
				}
				else{
					for($row_num = 0; $row_num < $num_rows_searchByASC; $row_num++){
						$values_searchByASC = array_values($row_searchByASC);
						print '<script type="text/javascript">';
						print 'displayResults('.json_encode($values_searchByASC).')';
						print '</script>';
						$row_searchByASC = mysqli_fetch_assoc($result_searchByASC);
					}
				}
			}
		}
		mysqli_close($db);
	?>
</body>
</html>