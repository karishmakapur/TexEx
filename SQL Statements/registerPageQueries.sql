/*checking if a user exists already with a given email*/
SELECT Email
FROM tbl_user
WHERE Email LIKE 'jenkinsBob1902@yahoo.com';

/*Registering a user creates a user record*/
INSERT INTO tbl_user(Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Bob Jenkins', 'jenkinsBob1902@yahoo.com', 'j3nk!nzB0b', NULL, 'University of Southern California', FALSE, FALSE, now(), NULL);
