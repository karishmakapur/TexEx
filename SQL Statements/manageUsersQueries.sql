/*Get all users whose account is not disabled*/
SELECT UserID, Email, Name, Locked
FROM tbl_user
WHERE Disabled = FALSE;

/*search by name*/
SELECT UserID, Email, Name, Locked
FROM tbl_user
WHERE Name LIKE 'Karishma Kapur';

/*Lock a user account*/
UPDATE tbl_user
SET Locked = TRUE
WHERE UserID = 2;

/*unlock a user*/
UPDATE tbl_user
SET Locked = FALSE
WHERE UserID = 2;