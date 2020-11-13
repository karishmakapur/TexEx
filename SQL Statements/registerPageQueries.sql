/*Registering a user creates a user record*/
INSERT INTO tbl_user(Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Bob Jenkins', 'jenkinsBob1902@yahoo.com', 'j3nkinzB0b', NULL, 'University of Southern California', FALSE, FALSE, now(), NULL);
