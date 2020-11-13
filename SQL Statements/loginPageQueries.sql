/*check user's credentials*/
SELECT Email, Password
FROM tbl_user
WHERE Email LIKE 'lopez816@cougars.csusm.edu' and Password LIKE 'P@ssword1';
