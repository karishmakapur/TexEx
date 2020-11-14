/*query for getting all posts sorted by most recently posted*/
SELECT BookImage, BookTitle, BookISBN, BookAuthor, PostContent
FROM tbl_book_post
WHERE PostVisible = TRUE
ORDER BY PostedStamp DESC;

/*query for making a post*/
/*this query is dependent upon input from the user, 
so for now the values are hardcoded into the statement*/
INSERT INTO tbl_book_post(UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu'),'Give Me Liberty! An American History', 'Eric Foner', '978-0393418262', 'This is a history textbook. Contact me at (222)222-2222', 'Images/GiveMeLiberty.PNG', now(), NULL, TRUE);


