/*Query to get a user's account information for the My Account Information section*/
SELECT  Name, Email, School 
FROM tbl_user
WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu');

/* update user information */
UPDATE tbl_user 
SET Name = 'Marco', Email = 'lopez811@csu.fullerton.edu', School = 'California State University Fullerton', UpdatedDate = '2020-11-11 07:51:09'
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x);

/*get user's current password for password change validation*/
SELECT password FROM tbl_user
WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu');

/* if user entered in the correct old password, then we can update password */
UPDATE tbl_user 
SET password = 'n3wP@sswordM@rco', UpdatedDate = '2020-11-11 08:00:00'
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') as x);

/* update account status to disabled */
UPDATE tbl_user 
SET Disabled = TRUE, DisabledDate = '2020-11-11 08:01:59'
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') as x);

/* display all saved searches in the account page */
SELECT SearchType, SearchTerm FROM tbl_saved_search
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez811@csu.fullerton.edu') as x);