SELECT BookTitle, BookAuthor, BookISBN, PostContent, BookImage FROM tbl_book_post
WHERE UserID = '1' 
ORDER BY PostedStamp DESC;