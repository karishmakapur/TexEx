/*Query for getting all a specific user's posts*/
SELECT PostID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage 
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND tbl_user.Email LIKE 'lopez816@cougars.csusm.edu' AND PostVisible = TRUE
ORDER BY PostedStamp DESC;

/*Query for editing a post*/
UPDATE tbl_book_post
SET BookTitle = "Programming Book", BookAuthor = "R. Sebesta", BookISBN = '123-4567891234', PostContent = 'I have changed the content of this post.'
WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE 'lopez816@cougars.csusm.edu')
AND PostID = 2;

/*Query for deleting a post*/
UPDATE tbl_book_post
SET PostVisible = FALSE, LastUpdated = '2020-11-11 07:47:35'
WHERE UserID = (SELECT UserID FROM tbl_user WHERE tbl_user.Email LIKE 'lopez816@cougars.csusm.edu')
AND PostID = 2;