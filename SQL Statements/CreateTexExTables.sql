DROP TABLE IF EXISTS tbl_reviews;
DROP TABLE IF EXISTS tbl_book_post;
DROP TABLE IF EXISTS tbl_saved_search;
DROP TABLE IF EXISTS tbl_manages;
DROP TABLE IF EXISTS tbl_admin;
DROP TABLE IF EXISTS tbl_user;

CREATE TABLE tbl_user (
UserID int NOT NULL AUTO_INCREMENT UNIQUE,
Name varchar(255) NOT NULL,
Email varchar(255) NOT NULL,
Password varchar(255) NOT NULL,
UpdatedDate datetime,
School varchar(255) NOT NULL,
Disabled bool NOT NULL,
Locked bool NOT NULL,
CreationDate datetime NOT NULL,
DisabledDate datetime,
CONSTRAINT pk_user PRIMARY KEY (UserID)
);

ALTER TABLE tbl_user AUTO_INCREMENT = 0;

CREATE TABLE tbl_admin (
AdminID int NOT NULL AUTO_INCREMENT UNIQUE,
Name varchar(255) NOT NULL,
Email varchar(255) NOT NULL,
Password varchar(255) NOT NULL,
CreationDate datetime NOT NULL,
CONSTRAINT pk_admin PRIMARY KEY (AdminID)
);

ALTER TABLE tbl_admin AUTO_INCREMENT = 0;

CREATE TABLE tbl_manages (
AdminID int NOT NULL,
UserID int NOT NULL,
ActionTaken varchar(20),
ActionDate datetime,
CONSTRAINT pk_manages PRIMARY KEY (AdminID, UserID),
CONSTRAINT fk_manages_admin FOREIGN KEY (AdminID) REFERENCES tbl_admin(AdminID) ON DELETE CASCADE,
CONSTRAINT fk_manages_user FOREIGN KEY (UserID) REFERENCES tbl_user(UserID) ON DELETE CASCADE
);

CREATE TABLE tbl_book_post (
PostID int NOT NULL AUTO_INCREMENT UNIQUE,
UserID int NOT NULL,
BookTitle varchar(255) NOT NULL,
BookAuthor varchar(255) NOT NULL,
BookISBN varchar(255) NOT NULL,
PostContent longtext NOT NULL,
BookImage varchar(255) NOT NULL,
PostedStamp datetime NOT NULL,
LastUpdated datetime,
PostVisible bool,
CONSTRAINT pk_post PRIMARY KEY (PostID, UserID),
CONSTRAINT fk_postedBy FOREIGN KEY (UserID) REFERENCES tbl_user(UserID) ON DELETE CASCADE
);

ALTER TABLE tbl_book_post AUTO_INCREMENT = 0;

CREATE TABLE tbl_saved_search (
SearchID int NOT NULL AUTO_INCREMENT UNIQUE,
UserID int NOT NULL,
SearchType varchar(255) NOT NULL,
SearchTerm varchar(255) NOT NULL,
CONSTRAINT pk_search PRIMARY KEY (SearchID, UserID),
CONSTRAINT fk_savedBy FOREIGN KEY (UserID) REFERENCES tbl_user(UserID) ON DELETE CASCADE
);

ALTER TABLE tbl_saved_search AUTO_INCREMENT = 0;

CREATE TABLE tbl_reviews (
AdminID int NOT NULL,
PostID int NOT NULL,
UserID int NOT NULL,
ActionTaken varchar(20),
ActionDate datetime,
CONSTRAINT pk_reviews PRIMARY KEY (AdminID, PostID, UserID),
CONSTRAINT fk_reviews_admin FOREIGN KEY (AdminID) REFERENCES tbl_admin(AdminID) ON DELETE CASCADE,
CONSTRAINT fk_reviews_post FOREIGN KEY (PostID, UserID) REFERENCES tbl_book_post(PostID, UserID) ON DELETE CASCADE
);