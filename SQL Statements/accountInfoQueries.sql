/*Query to get a user's account information for the My Account Information section*/
SELECT  Name, Email, School 
FROM tbl_user
WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') 
AND Disabled = FALSE;


/* display all saved searches in the account page */
SELECT SearchID, SearchType, SearchTerm 
FROM tbl_saved_search
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu' AND Disabled = FALSE) as x);

/*get user's current password for password change validation*/
SELECT Password 
FROM tbl_user
WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') AND Disabled = FALSE AND Password LIKE "P@ssword1";

/* if user entered in the correct old password, then we can update password */
UPDATE tbl_user 
SET password = 'n3wP@sswordM@rco', UpdatedDate = now()
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') as x) AND Disabled = FALSE;

/*before updating a user's account, we first check if the email they are trying to change to
already has an account*/
SELECT Email 
FROM tbl_user 
WHERE Email LIKE 'lopez811@csu.fullerton.edu'
AND UserID != (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x);

/* update user information */
UPDATE tbl_user 
SET Name = 'Marco', Email = 'lopez811@csu.fullerton.edu', School = 'California State University Fullerton', UpdatedDate = now()
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x) AND Disabled = FALSE;


/* update account status to disabled */
UPDATE tbl_user 
SET Disabled = TRUE, DisabledDate = now()
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') as x);

