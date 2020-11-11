SELECT  Name, Email, School FROM tbl_user
WHERE UserID = '1'; 

/* update user information */
UPDATE tbl_user 
SET Name = 'Marco', Email = 'lopez811@csu.fullerton.edu', School = 'California State University Fullerton'
WHERE UserID = '1';

/* display updated user information */
SELECT  Name, Email, School FROM tbl_user
WHERE UserID = '1';

SELECT password FROM tbl_user
WHERE UserID = '1';

/* update password */
UPDATE tbl_user 
SET password = 'P@ssword11'
WHERE UserID = '1';

/* display updated user password */
SELECT password FROM tbl_user
WHERE UserID = '1';

SELECT Disabled, DisabledDate FROM tbl_user
WHERE UserID = '1';

/* update account status */
UPDATE tbl_user 
SET Disabled = TRUE, DisabledDate = CURRENT_TIMESTAMP
WHERE UserID = '1';

/* display updated account status */
SELECT Disabled, DisabledDate FROM tbl_user
WHERE UserID = '1';

/* display all saved searches in the account page */
SELECT SearchType, SearchTerm FROM tbl_saved_search
WHERE UserID = '1';