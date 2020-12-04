<?php
	session_start();
	ini_set('session.cookie_secure', 1);
	if(!isset($_SESSION["sid"])){
		header("location:login.php");
		exit();
	}
?>
<!DOCTYPE html>

<html lang="en">
<head>
	<title>Sell your book.</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="userPages.css"/>
	<link rel="icon" href="Images/Logo.svg" type="image/x-icon" />
	<script type="text/javascript" src="sell.js"></script>
</head>

<body>
	<!--Start of NAV -->
	<div class="topnav">
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
	
	<!--Post bar -->
		<h1><span class="text">Sell your books and earn some cash!</span></h1>
		<form method="post" enctype="multipart/form-data" id="postForm" action="#">
			<div class="sellBarWrapper" id="sellBarWrapper">
				<div class="bookBarRow1">
					<input class="bookBar" type="text" placeholder="Book Title" name="bookTitle" aria-label="User input of book title" id="bookTitle" required/>
					<input class="bookBar" type="text" placeholder="Book Author" name="bookAuthor" aria-label="User input of book author" id="bookAuthor" required/>
					<input class="bookBar" type="text" placeholder="Book ISBN" name="bookISBN" aria-label="User input of book's ISBN" id="bookISBN" required/>
				</div>
				<div>
					<textarea class="postBar" placeholder="Description of TextBook and Contact Information" name="postArea" aria-label="User input of book description and contact information" id="postArea" required></textarea>
				</div>
				<div class="postButtons">
					<input class="uploadImage" type="file" accept="image/*" value="Upload Image" aria-label="Upload Image" name="uploadImageButton" id="uploadImageButton"/>
					<input class="post" type="submit" value="Post" aria-label="Post Button" name="postButton" id="postButton"/>
				</div>
			</div>
		</form>
	
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
		
		//get all posts sorted by most recently posted
		$query_get_posts = 'SELECT BookImage, BookTitle, BookISBN, BookAuthor, PostContent FROM tbl_book_post, tbl_user WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = False ORDER BY PostedStamp ASC';
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
		
		if(isset($_POST["postButton"])){
			$BookTitle = addslashes(trim($_POST["bookTitle"]));
			$BookAuthor = trim($_POST["bookAuthor"]);
			$BookISBN = trim($_POST["bookISBN"]);
			$BookDesc = addslashes(trim($_POST["postArea"]));
			$BookImage = trim($_POST["uploadImageButton"]);
			if(!isset($_FILES["uploadImageButton"]) || $_FILES['uploadImageButton']['error'] == 4){
					$target_file = "Images/no-image-icon.png";
				
			}
			else{
				$extensionNum = 0;
				
				//upload the image to the server
				$target_dir = "Images/";
				$target_file = $target_dir . basename($_FILES["uploadImageButton"]["name"]);
				$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
				$actual_name = pathinfo($target_file,PATHINFO_FILENAME);
				$original_name = $actual_name;
				$extension = pathinfo($target_file, PATHINFO_EXTENSION);
				// Check if file already exists
				while (file_exists($target_file)) {
					$extensionNum++;
					$target_file = $target_dir . $original_name . $extensionNum . "." . $extension;
				}
			
				if (move_uploaded_file($_FILES["uploadImageButton"]["tmp_name"], $target_file)) {
					echo "The file ". htmlspecialchars( basename( $_FILES["uploadImageButton"]["name"])). " has been uploaded.";
				}
				else{
					print '<script type="text/javascript">';
					print 'alert("Sorry, there was an error uploading your file. Please try again later.");';
					print '</script>';
					$target_file = "Images/no-image-icon.png";
					
				}
			}
			//insert post into db
			$query_make_post = 'INSERT INTO tbl_book_post(UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdatedByUser, PostVisible)
								VALUES ((SELECT UserID FROM tbl_user WHERE Email LIKE "' . $_SESSION['sid'] . '"), "' . $BookTitle . '", "' . $BookAuthor . '", "' . $BookISBN . '", "' . $BookDesc . '", "' . $target_file . '", now(), NULL, TRUE)';
			$query_html_make_post = htmlspecialchars($query_make_post);
			$result_make_post = mysqli_query($db, $query_make_post);
			if(!$result_make_post){
				print '<script type="text/javascript">';
				print 'alert("Sorry, there was an error making your post. Please try again.");';
				print '</script>';
			}
			else{
				print "<script type='text/javascript'>";
				print "window.open('sell.php','_self');";
				print "</script>";
				
			}

		}//end of isset
		mysqli_close($db);
	?>
</body>
</html>