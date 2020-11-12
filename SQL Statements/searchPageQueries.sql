/* These queries will show posts based on the specified search criteria. */

/*Search by ISBN*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE tbl_book_post.BookISBN LIKE '978-0133943038';

/*Search by title*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE tbl_book_post.BookTitle LIKE 'Photography: A Cultural History';

/*search by author*/
SELECT BookImage, BookTitle, BookAuthor, BookISBN, PostContent
FROM tbl_book_post
WHERE tbl_book_post.BookAuthor LIKE 'Michael Geringer';

/*Adding a saved search record for a user - this means they clicked the saved search box*/
INSERT INTO tbl_saved_search(UserID, SearchType, SearchTerm)
VALUES ((SELECT UserID From tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu'), 'Author', 'Michael Geringer');

/*Deleting a saved search record for a user - this means they unclicked the saved search box*/
DELETE FROM tbl_saved_search
WHERE UserID = (SELECT UserID From tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu') AND SearchType LIKE 'Author' AND SearchTerm LIKE 'Michael Geringer';