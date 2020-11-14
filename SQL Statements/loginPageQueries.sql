/*check user's credentials*/
SELECT Email, Password
FROM tbl_user
WHERE Email LIKE 'lopez816@cougars.csusm.edu' and Password LIKE 'P@ssword1';

/*check if user account is disabled*/
SELECT Disabled
FROM tbl_user
WHERE Email LIKE 'lopez816@cougars.csusm.edu' and Password LIKE 'P@ssword1';

/*check if user account is locked*/
SELECT Locked
FROM tbl_user
WHERE Email LIKE 'lopez816@cougars.csusm.edu' and Password LIKE 'P@ssword1';