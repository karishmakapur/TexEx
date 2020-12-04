/* Save Search: first see if a user has already saved a search*/
SELECT * 
FROM tbl_saved_search
WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu' AND SearchType LIKE 'BookISBN' AND SearchTerm LIKE '978-0133943038');

/*If a Search has not been saved, then save it.
Adding a saved search record for a user - 
this means they clicked the saved search box*/
INSERT INTO tbl_saved_search(UserID, SearchType, SearchTerm)
VALUES ((SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu'), 'BookISBN', '978-0133943038');


/*Deleting a saved search record for a user - this means they unclicked the saved search box*/
DELETE FROM tbl_saved_search
WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') AND SearchType LIKE 'BookISBN' AND SearchTerm LIKE '978-0133943038';

/*search by author*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent 
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookAuthor LIKE "%Michael Geringer%" 
AND PostVisible = TRUE 
AND Disabled = False;

/*Search by title*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent 
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookTitle LIKE "%Photography: A Cultural History%" 
AND PostVisible = TRUE 
AND Disabled = False;

/*Search by ISBN*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent 
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookISBN LIKE "%978-0133943038%" 
AND PostVisible = TRUE 
AND Disabled = False;

/*sort search by Recently Posted*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent, PostedStamp 
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookAuthor LIKE "%M%"
AND PostVisible = TRUE 
AND Disabled = False 
ORDER BY PostedStamp DESC;

/*sort search by Ascending Title*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookAuthor LIKE "%M%"
AND PostVisible = TRUE 
AND Disabled = False 
ORDER BY BookTitle ASC;

/*sort search by Ascending Author*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookAuthor LIKE "%M%"
AND PostVisible = TRUE 
AND Disabled = False 
ORDER BY BookAuthor ASC;

/*sort search by Oldest Post Date*/
SELECT BookImage, BookTitle,  BookISBN, BookAuthor, PostContent, PostedStamp 
FROM tbl_book_post, tbl_user 
WHERE tbl_book_post.UserID = tbl_user.UserID 
AND BookAuthor LIKE "%M%"
AND PostVisible = TRUE 
AND Disabled = False 
ORDER BY PostedStamp ASC;

