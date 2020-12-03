/* These queries will show posts based on the specified search criteria. */
SELECT * 
FROM tbl_saved_search
WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu' AND SearchType LIKE 'Author' AND SearchTerm LIKE 'Michael Geringer')

SELECT BookImage, BookTitle, BookISPN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_Post.UserID = tbl_user.UserID And BookAuthor LIKE 'Michael Geringer' AND PostVisible = TRUE and Disabled = FALSE;

SELECT BookImage, BookTitle, BookISBN, BookAuthor, PostContent, PostedStamp
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND SearchType 

/*search by author*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE BookAuthor LIKE 'Michael Geringer' AND PostVisible = TRUE;

/*Search by title*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE BookTitle LIKE 'Photography: A Cultural History' AND PostVisible = TRUE;

/*Search by ISBN*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE BookISBN LIKE '978-0133943038' AND PostVisible = TRUE;

/*Adding a saved search record for a user - this means they clicked the saved search box*/
INSERT INTO tbl_saved_search(UserID, SearchType, SearchTerm)
VALUES ((SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu'), 'Author', 'Michael Geringer');

/*Deleting a saved search record for a user - this means they unclicked the saved search box*/
DELETE FROM tbl_saved_search
WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') AND SearchType LIKE 'Author' AND SearchTerm LIKE 'Michael Geringer';