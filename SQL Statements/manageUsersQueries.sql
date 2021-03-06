/*Get all users whose account is not disabled*/
SELECT UserID, Email, Name, Locked
FROM tbl_user
WHERE Disabled = FALSE
ORDER BY UserID DESC;

/*search by name*/
SELECT UserID, Email, Name, Locked 
FROM tbl_user 
WHERE Name LIKE '%Karishma Kapur%'
AND Disabled = FALSE;

/*sort search by first name alphabetically*/
SELECT UserID, Email, Name, Locked 
FROM tbl_user 
WHERE Name LIKE '%K%'
AND Disabled = FALSE ORDER BY Name ASC;

/*sort search by most recent creation date*/
SELECT UserID, Email, Name, Locked 
FROM tbl_user 
WHERE Name LIKE '%K%'
AND Disabled = FALSE ORDER BY CreationDate DESC;

/*sort search by oldest creation date*/
SELECT UserID, Email, Name, Locked 
FROM tbl_user 
WHERE Name LIKE '%K%'
AND Disabled = FALSE ORDER BY CreationDate ASC;

/*Lock a user account*/
UPDATE tbl_user
SET Locked = TRUE
WHERE UserID = 2;

/*first see if a record exists in the tbl_manages*/
SELECT *
FROM tbl_manages
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com') AND UserID = 2;

/*if the record does not exist, and since a lock was made, a tbl_manages record needs to be created*/
INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com'), 2, 'Locked Account', now());

/*if record does  exist, and since a lock was made, the tbl_manages record needs to be updated
UPDATE tbl_manages
SET ActionTaken = 'Locked Account', ActionDate = now()
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com')
	AND UserID = 2;*/

/*unlock a user*/
UPDATE tbl_user
SET Locked = FALSE
WHERE UserID = 2;

/*first see if a record exists in the tbl_manages*/
SELECT *
FROM tbl_manages
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com') AND UserID = 2;

/*if the record does not exist, and since a lock was made, a tbl_manages record needs to be created
INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com'), 2, 'Unlocked Account', now());*/

/*if record does  exist, and since a lock was made, the tbl_manages record needs to be updated*/
UPDATE tbl_manages
SET ActionTaken = 'Unlocked Account', ActionDate = now()
WHERE AdminID = (SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com')
	AND UserID = 2;