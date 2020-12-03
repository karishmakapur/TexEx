SELECT Email
FROM tbl_user
WHERE Email LIKE 'lopez816@cougars.csusm.edu';

UPDATE tbl_user
SET Password = 'P@ssword123'
WHERE UserID = (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x);

