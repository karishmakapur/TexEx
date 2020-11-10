DROP TABLE IF EXISTS tbl_post;
DROP TABLE IF EXISTS tbl_saved_search;
DROP TABLE IF EXISTS tbl_user;

CREATE TABLE tbl_user (
UserID int NOT NULL AUTO_INCREMENT UNIQUE,
Name varchar(255) NOT NULL,
Email varchar(255) NOT NULL,
School varchar(255) NOT NULL,
Password varchar(255) NOT NULL,
Disabled bool NOT NULL,
Locked bool NOT NULL,
CreationDate datetime NOT NULL,
DisabledDate datetime,
LockedDate datetime,
UpdatedDate datetime,
Role varchar(6) NOT NULL,
AdminID int,
CONSTRAINT pk_user PRIMARY KEY (UserID),
CONSTRAINT fk_admin FOREIGN KEY (AdminID) REFERENCES tbl_user(UserID) ON DELETE SET NULL
);

ALTER TABLE tbl_user AUTO_INCREMENT = 0;

CREATE TABLE tbl_post (
PostID int NOT NULL AUTO_INCREMENT UNIQUE,
UserID int NOT NULL,
BookTitle varchar(255) NOT NULL,
BookAuthor varchar(255) NOT NULL,
BookISBN varchar(255) NOT NULL,
BookDesc longtext NOT NULL,
BookImage varchar(255) NOT NULL,
PostedStamp datetime NOT NULL,
LastUpdated datetime,
UpdatedBy int,
CONSTRAINT pk_post PRIMARY KEY (PostID),
CONSTRAINT fk_postedBy FOREIGN KEY (UserID) REFERENCES tbl_user(UserID) ON DELETE CASCADE,
CONSTRAINT fk_editedBy FOREIGN KEY (UpdatedBy) REFERENCES tbl_user(UserID) ON DELETE SET NULL
);

ALTER TABLE tbl_post AUTO_INCREMENT = 0;

CREATE TABLE tbl_saved_search (
SearchID int NOT NULL AUTO_INCREMENT UNIQUE,
UserID int NOT NULL,
SearchType varchar(255) NOT NULL,
SearchTerm varchar(255) NOT NULL,
CONSTRAINT pk_search PRIMARY KEY (SearchID, UserID),
CONSTRAINT fk_savedBy FOREIGN KEY (UserID) REFERENCES tbl_user(UserID) ON DELETE CASCADE
);

ALTER TABLE tbl_saved_search AUTO_INCREMENT = 0;