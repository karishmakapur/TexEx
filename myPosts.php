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
	<title>My Posts Page</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="userPages.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="myPosts.js"></script>
</head>

<body>
	<!--Start of NAV -->
	<div class="topnav" id="nav">
		<a href="search.php">Search&nbsp;&nbsp;<img src="Images/searchIcon.svg" alt="Search Icon" width="10" height="10"/></a>
		<a href="sell.php">Sell&nbsp;&nbsp;<img src="Images/sellIcon.svg" alt="Sell Icon" width="10" height="10"/></a>
		<a href="myPosts.php">My Posts&nbsp;&nbsp;<img src="Images/postsIcon.svg" alt="Post Icon" width="10" height="10"/></a>
		<a href="accountInfo.php">Account&nbsp;&nbsp;<img src="Images/accountIcon.svg" alt="Account Icon" width="10" height="10"/></a>
		<a href="logout.php">Logout&nbsp;&nbsp;<img src="Images/logoutIcon.svg" alt="Logout Icon" width="10" height="10"/></a>
		<div>
			<img src="Images/Logo.svg" alt="TexEx Logo" width="30" height="30"/>
		</div>
	</div>
	<!-- End of NAV -->
	<h1 id="heading"><span class="text">View your posts here!</span></h1>
	<?php
		$key = $_SERVER['QUERY_STRING'];
		if($key == "Errormessage=edit"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not update post. Please try again later.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Successmessage=edit"){
			print '<script type="text/javascript">';
			print "notificationMessage('Successmessage', 'Success! Your post has been updated.');";
			print "removeQueryString();";
			print '</script>';
		}
		else if($key == "Errormessage=delete"){
			print '<script type="text/javascript">';
			print "notificationMessage('Errormessage', 'Error! Could not delete post. Please try again later.');";
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
		
		//get all posts sorted by most recently posted
		$query_get_posts = 'SELECT PostID, BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user WHERE tbl_book_post.UserID = tbl_user.UserID AND tbl_user.Email LIKE "' .$_SESSION['sid'] . '"AND PostVisible = TRUE ORDER BY PostedStamp ASC';

		$query_html_get_posts = htmlspecialchars($query_get_posts);
		$result_get_posts = mysqli_query($db, $query_get_posts);
		$num_fields_get_posts = mysqli_num_fields($result_get_posts);
		$num_rows_get_posts = mysqli_num_rows($result_get_posts);
		$row_get_posts = mysqli_fetch_assoc($result_get_posts);
		if($num_rows_get_posts == 0){
			print '<script type="text/javascript">';
			print 'displayNoResults();';
			print '</script>';
		}
		else{
			for($row_num = 0; $row_num < $num_rows_get_posts; $row_num++){
				$values_get_posts = array_values($row_get_posts);
				print '<script type="text/javascript">';
				print 'displayResults('.json_encode($values_get_posts).');';
				print '</script>';
				$row_get_posts = mysqli_fetch_assoc($result_get_posts);
			}
			
		}
		
		$key = $_SERVER['QUERY_STRING'];
		$primaryKey = substr($key, 4);
		if(isset($_POST['savePostBttn' . $primaryKey])){
			$title = trim($_POST['titleInput'. $primaryKey]);
			$author = trim($_POST['authorInput'. $primaryKey]);
			$isbn = trim($_POST['isbnInput'. $primaryKey]);
			$desc = trim($_POST['descInput'. $primaryKey]);
			
			$query_save_post = 'UPDATE tbl_book_post SET BookTitle = "' . $title .'", BookAuthor = "'. $author .'", BookISBN = "' . $isbn . '", PostContent = "' . $desc . '", LastUpdatedByUser = now()
								WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE "' . $_SESSION['sid'] . '") AND PostID = ' . $primaryKey;
			$query_html_save_post = htmlspecialchars($query_save_post);
			$result_save_post = mysqli_query($db, $query_save_post);
			$refreshQueryString = 'myPosts.php';
			if(!$result_save_post){
				$refreshQueryString = $refreshQueryString . "?Errormessage=edit";
				
			}
			else{
				$refreshQueryString = $refreshQueryString . "?Successmessage=edit";
				
			}
			
			print "<script type='text/javascript'>";
			print "window.open('" . $refreshQueryString . "', '_self');";
			print "</script>";
								
		}
		
		if(isset($_POST['deleteBtn' . $primaryKey])){
			$query_delete_post = 'UPDATE tbl_book_post SET PostVisible = FALSE, LastUpdatedByUser = now()
								WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE "' . $_SESSION['sid'] . '") AND PostID = ' . $primaryKey;
			$query_html_delete_post = htmlspecialchars($query_delete_post);
			$result_delete_post = mysqli_query($db, $query_delete_post);
			$refreshQueryString = 'myPosts.php';
			if(!$result_delete_post){
				$refreshQueryString = $refreshQueryString . "?Errormessage=delete";
				
			}
			else{
				$refreshQueryString = $refreshQueryString . "?Successmessage=delete";
				
			}
			
			print "<script type='text/javascript'>";
			print "window.open('" . $refreshQueryString . "', '_self');";
			print "</script>";
								
		}
		mysqli_close($db);
	?>
</body>
</html>