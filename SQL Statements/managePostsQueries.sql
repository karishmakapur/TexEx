/*All posts*/
SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE;

/*search by Author*/
SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND BookAuthor LIKE 'Michael Geringer';

/*search by title*/
SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND BookTitle LIKE 'Principles of Economics';

/*search by ISBN*/
SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND BookISBN LIKE '978-0205873487';

/*search by post owner's email*/
SELECT PostID, Email, BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post, tbl_user
WHERE tbl_book_post.UserID = tbl_user.UserID AND PostVisible = TRUE AND Disabled = FALSE AND Email LIKE 'sharp032@cougars.csusm.edu';

/*edit a post*/
UPDATE tbl_book_post
SET BookTitle = "Economics", BookISBN = '978-1305585126', BookAuthor = 'N. Gregory Mankiw', PostContent = 'This is an economics textbook. Contact me at (222)222-2222'
WHERE PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');

/*delete a post*/
UPDATE tbl_book_post
SET PostVisible = FALSE
WHERE PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');