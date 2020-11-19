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

/*first see if record exists*/
SELECT *
FROM tbl_reviews
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com') AND PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');

/*if record does not exist, and since an edit was made, a tbl_reviews record needs to be added*/
INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com'), 1, (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu'), 'Edited Post', now());

/*if record does  exist, and since an edit was made, the tbl_reviews record needs to be updated
UPDATE tbl_reviews
SET ActionTaken = 'Edited Post', ActionDate = now()
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com')
	AND PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');*/

/*delete a post*/
UPDATE tbl_book_post
SET PostVisible = FALSE
WHERE PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');

/*first see if record exists*/
SELECT *
FROM tbl_reviews
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com') AND PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');

/*if record does not exist, and since a delete was made, a tbl_reviews record needs to be added
INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com'), 1, (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu'), 'Deleted Post', now());*/

/*if record does  exist, and since an edit was made, the tbl_reviews record needs to be updated*/
UPDATE tbl_reviews
SET ActionTaken = 'Deleted Post', ActionDate = now()
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com')
	AND PostID = 1 AND UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu');
	