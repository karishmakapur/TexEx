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
    <meta charset = "utf-8">
    <title>Admin Manage Posts</title>
    <link rel = "stylesheet" type = "text/css" href = "adminPages.css"/>
	<link rel="icon" href="../Images/Logo.svg" type="image/x-icon" />
    <script type="text/javascript" src = "managePosts.js"> </script>
  </head>
 
  <body id="documentBody">
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
		<div class="searchField" id="searchBox">
			<select aria-label="Search By Options" name="searchType" id="searchType" class="selectBox">
						<option value="Choose a field" disabled>Any Field</option>
						<option value="BookAuthor" <?PHP if($_POST['searchType'] == "BookAuthor") echo 'selected'?>>Book Author</option>
						<option value="BookISBN"  <?PHP if($_POST['searchType'] == "BookISBN") echo 'selected'?>>Book ISBN</option>
						<option value="BookTitle" <?PHP if($_POST['searchType'] == "BookTitle") echo 'selected'?>>Book Title</option>
						<option value="Email" <?PHP if($_POST['searchType'] == "Email") echo 'selected'?>>User Email</option>
			</select>
			<div class="bar">
				<input type="text" placeholder="Book Title, Author, ISBN, or Email Address for Posts Made By A Specific User" name="searchBar" aria-label="Search by Book Title, Author, ISBN" id="searchBar" class="searchBar" value="<?php if(isset($_POST['searchBar'])) echo htmlspecialchars($_POST['searchBar']); ?>"/>
			</div>
			<div class="bar">
				<input type="submit" value="Search" aria-label="Search Button" name="searchButton" id="searchButton" class="searchButton"/>
			</div>
		</div>
		<div class="sortSearchWrapperPosts" id="sortSearchWrapper">
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
	<br /><br /><br /><br /><br /><br />	
	<script type="text/javascript" src="managePostsr.js"></script>
	<noscript>Your browser does not support Javascript</noscript>
   <?php
		$key = $_SERVER['QUERY_STRING'];
		if($key == "Errormessage=edit"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not update post. Please try again later.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Errormessage=delete"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not delete post. Please try again later.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Successmessage=edit"){
			print '<script type="text/javascript">';
			print "notificationMessage('Successmessage', 'Success! Your post has been updated.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Successmessage=delete"){
			print '<script type="text/javascript">';
			print "notificationMessage('Successmessage', 'Success! Your post has been deleted.');";
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
		$query_get_posts = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
							FROM tbl_book_post, tbl_user WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE';
		$query_html_get_posts = htmlspecialchars($query_get_posts);
		$result_get_posts = mysqli_query($db, $query_get_posts);
		$num_fields_get_posts = mysqli_num_fields($result_get_posts);
		$num_rows_get_posts = mysqli_num_rows($result_get_posts);
		if($num_rows_get_posts == 0){
			print "<script type='text/javascript'>";
			print "showNoPosts();";
			print "</script>";
			
		}
		else{
			$row_get_posts = mysqli_fetch_assoc($result_get_posts);
			for($row_num = 0; $row_num < $num_rows_get_posts; $row_num++){
				$values_get_posts = array_values($row_get_posts);
				print "<script type='text/javascript'>";
				print "showPosts(" . json_encode($values_get_posts) . ");";
				print "</script>";
				$row_get_posts = mysqli_fetch_assoc($result_get_posts);
			}
		}
		
		if(isset($_POST['searchButton'])){
			print "<script type='text/javascript'>";
			print "deleteResults();";
			print "</script>";
			$search = $_POST['searchType'];
			$searchBy = trim($_POST['searchBar']);
			$sortBy = $_POST['sortSearch'];
			
			$query_string = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user
							WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND ' . $search . ' LIKE "%' . $searchBy .'%"';
			if($sortBy == 'Recently Posted'){
				$query_string = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user
							WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND ' . $search . ' LIKE "%' . $searchBy .'%" ORDER BY PostedStamp ASC';			
			}
			else if ($sortBy == 'ASCTitle'){
				$query_string = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user
							WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND ' . $search . ' LIKE "%' . $searchBy .'%" ORDER BY BookTitle DESC';			
			}
			else if ($sortBy == 'ASCAuthor'){
				$query_string = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user
							WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND ' . $search . ' LIKE "%' . $searchBy .'%" ORDER BY BookAuthor DESC';			
			}
			else if($sortBy == 'Oldest'){
				$query_string = 'SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user
							WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND ' . $search . ' LIKE "%' . $searchBy .'%" ORDER BY PostedStamp DESC';			
			}
			$query_html_string = htmlspecialchars($query_string);
			$result_string = mysqli_query($db, $query_string);
			$num_fields_string = mysqli_num_fields($result_string);
			$num_rows_string = mysqli_num_rows($result_string);
			if($num_rows_string == 0){
				print '<script type="text/javascript">';
				print 'showNoPosts();';
				print '</script>';
			}
			else{
				
				$row_string = mysqli_fetch_assoc($result_string);
				for($row_num = 0; $row_num < $num_rows_string; $row_num++){
					$values_string = array_values($row_string);
					print '<script type="text/javascript">';
					print 'showPosts('.json_encode($values_string).');';
					print '</script>';
					$row_string = mysqli_fetch_assoc($result_string);
				}
			}
		}
		$key = $_GET['key'];
		$email = $_GET['email'];
		if(isset($_POST['savePostBttn' . $key])){
			$title = trim($_POST['titleInput'. $key]);
			$author = trim($_POST['authorInput'. $key]);
			$isbn = trim($_POST['isbnInput'. $key]);
			$desc = trim($_POST['descInput'. $key]);
			
			$query_save_post = 'UPDATE tbl_book_post SET BookTitle = "' . $title .'", BookAuthor = "'. $author .'", BookISBN = "' . $isbn . '", PostContent = "' . $desc . '"
								WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE "' . $email . '") AND PostID = ' . $key;
			$query_html_save_post = htmlspecialchars($query_save_post);
			$result_save_post = mysqli_query($db, $query_save_post);
			$refreshQueryString = 'managePosts.php';
			if(!$result_save_post){
				$refreshQueryString = $refreshQueryString . "?Errormessage=edit";
				
			}
			else{
				$refreshQueryString = $refreshQueryString . "?Successmessage=edit";
				
			}
			$query_edit_reviews = 'SELECT * FROM tbl_reviews WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '") AND PostID = ' . $key . ' AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email .'")';
			$query_html_edit_reviews = htmlspecialchars($query_edit_reviews);
			$result_edit_reviews = mysqli_query($db, $query_edit_reviews);
			$num_fields_edit_reviews = mysqli_num_fields($result_edit_reviews);
			$num_rows_edit_reviews = mysqli_num_rows($result_edit_reviews);
			if($num_rows_edit_reviews == 0){
				$query_add = 'INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
							VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '"), ' . $key .', (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email .'"), "Edited Post", now())';
			
				$query_html_add = htmlspecialchars($query_add);
				$result_add = mysqli_query($db, $query_add);
				if(!$result_add){
					$refreshQueryString = $refreshQueryString . "?Errormessage=edit";
				}
			}
			else if($num_rows_edit_reviews > 0){
				$query_update = 'UPDATE tbl_reviews SET ActionTaken = "Edited Post", ActionDate = now()
								WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid']. '")
								AND PostID = ' . $key . ' AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email . '")';
				$query_html_update = htmlspecialchars($query_update);
				$result_update = mysqli_query($db, $query_update);
				if(!$result_update){
					$refreshQueryString = $refreshQueryString . "?Errormessage=edit";
				}
			}
			print "<script type='text/javascript'>";
			print "window.open('" . $refreshQueryString . "', '_self');";
			print "</script>";
								
		}
		
		if(isset($_POST['deleteBtn' . $key])){
			$query_delete_post = 'UPDATE tbl_book_post SET PostVisible = FALSE
								WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE "' . $email . '") AND PostID = ' . $key;
			$query_html_delete_post = htmlspecialchars($query_delete_post);
			$result_delete_post = mysqli_query($db, $query_delete_post);
			$refreshQueryString = 'managePosts.php';
			if(!$result_delete_post){
				$refreshQueryString = $refreshQueryString . "?Errormessage=delete";
				
			}
			else{
				$refreshQueryString = $refreshQueryString . "?Successmessage=delete";
				
			}
			$query_edit_reviews = 'SELECT * FROM tbl_reviews WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '") AND PostID = ' . $key . ' AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email .'")';
			$query_html_edit_reviews = htmlspecialchars($query_edit_reviews);
			$result_edit_reviews = mysqli_query($db, $query_edit_reviews);
			$num_fields_edit_reviews = mysqli_num_fields($result_edit_reviews);
			$num_rows_edit_reviews = mysqli_num_rows($result_edit_reviews);
			if($num_rows_edit_reviews == 0){
				$query_add = 'INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
							VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid'] . '"), ' . $key .', (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email .'"), "Deleted Post", now())';
			
				$query_html_add = htmlspecialchars($query_add);
				$result_add = mysqli_query($db, $query_add);
				if(!$result_add){
					$refreshQueryString = $refreshQueryString . "?Errormessage=delete";
				}
			}
			else if($num_rows_edit_reviews > 0){
				$query_update = 'UPDATE tbl_reviews SET ActionTaken = "Deleted Post", ActionDate = now()
								WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE "' . $_SESSION['adminsid']. '")
								AND PostID = ' . $key . ' AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE "' . $email . '")';
				$query_html_update = htmlspecialchars($query_update);
				$result_update = mysqli_query($db, $query_update);
				if(!$result_update){
					$refreshQueryString = $refreshQueryString . "?Errormessage=delete";
				}
			}
			print "<script type='text/javascript'>";
			print "window.open('" . $refreshQueryString . "', '_self');";
			print "</script>";
								
		}
		mysqli_close($db);
   ?>
	
  </body>
</html>
