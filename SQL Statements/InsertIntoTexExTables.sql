/*inserting 10 rows into tbl_admin*/
INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Marc Jacobs', 'jacobs8907@gmail.com', 'j@coBsM@rc', '2018-01-01 01:01:01');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Sandy Brown', 'brownsandy123@yahoo.com', 'S@ndybrownzz', '2018-02-10 08:15:45');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('John Smith', 'smithJohn@gmail.com', 'adminP@ssword', '2018-03-17 10:24:19');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Sarah Taylor', 'helloFromTaylor@gmail.com', 'P@ssword@dmin', '2018-04-19 12:01:01');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Jane Doe', 'doejane@gmail.com', 'j@n3LovesDo3', '2018-05-20 15:09:27');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Sally Ruth', 'sally.ruth@gmail.com', 'iLov3W0rk', '2018-06-01 17:18:31');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Morray Johnson', 'johnson1990@gmail.com', 'j0hns0nM0rr@y', '2018-07-11 18:01:01');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Jacob Crespo', 'crespoJ901@gmail.com', 'cr3spoJ@cob', '2018-01-01 20:21:16');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Matthew Smith', 'smith.matthew@gmail.com', 'm@ttysH0use', '2018-01-01 22:10:09');

INSERT INTO tbl_admin(Name, Email, Password, CreationDate)
VALUES ('Karen Poppins', 'karenIsPoppins123@gmail.com', 'p0pp1nsK@r3n', '2018-01-01 23:18:17');


/*inserting 10 rows into tbl_user*/
INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Marcos Lopez', 'lopez816@cougars.csusm.edu', 'P@ssword1', NULL, 'California State University San Marcos', FALSE, FALSE, '2019-12-31 23:40:10', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Karishma Kapur', 'kapur004@cougars.csusm.edu', 'P@ssword2', NULL, 'California State University San Marcos', FALSE, FALSE, '2020-01-01 13:10:10', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Peter Sharp', 'sharp032@cougars.csusm.edu', 'P@ssword3', NULL, 'California State University San Marcos', FALSE, FALSE, '2019-12-31 23:40:10', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Pascaul Sebastian', 'sebas004@cougars.csusm.edu', 'P@ssword4', NULL, 'California State University San Marcos', FALSE, FALSE, '2020-01-01 05:10:10', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Arianna Camino', 'camin003@cougars.csusm.edu', 'P@assword5', NULL, 'California State University San Marcos', FALSE, FALSE, '2020-01-01 13:10:10', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Michael Trani', 'trani001@cougars.csusm.edu', 'P@ssword6', NULL, 'California State University San Marcos', FALSE, FALSE, '2020-4-21 1:59:59', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Benjamin Gonzalez', 'gonza593@cougars.csusm.edu', 'P@ssword7', NULL, 'California State University San Marcos', FALSE, FALSE, '2020-10-10 23:50:23', NULL);

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Kotonya Knight', 'knight2112@csu.fullerton.edu', 'P@ssword8', NULL, 'California State University Fullerton', FALSE, TRUE, '2019-11-30 23:50:23', NULL);

/*Since Kotonya's account is locked, a record needs to be added to tbl_manages*/
INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'smithJohn@gmail.com'), (SELECT UserID FROM tbl_user WHERE Email LIKE 'knight2112@csu.fullerton.edu'), 'Locked Account', '2019-12-24 12:02:19');

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Kelly Jones', 'jonesy987@cougars.csusm.edu', 'P@ssword9', NULL, 'California State University San Marcos', FALSE, TRUE, '2020-01-01 05:10:10', NULL);

/*Since Kelly's account is locked, a record needs to be added to tbl_manages*/
INSERT INTO tbl_manages(AdminID, UserID, ActionTaken, ActionDate)
VALUES ((SELECT AdminID FROM tbl_admin WHERE Email LIKE 'jacobs8907@gmail.com'), (SELECT UserID FROM tbl_user WHERE Email LIKE 'jonesy987@cougars.csusm.edu'), 'Locked Account', '2020-11-11 12:02:19');

INSERT INTO tbl_user (Name, Email, Password, UpdatedDate, School, Disabled, Locked, CreationDate, DisabledDate)
VALUES ('Patrick Star', 'star.patrick@student.csulb.edu', 'P@ssword10', NULL, 'California State University Long Beach', TRUE, FALSE, '2020-3-08 10:32:20', '2020-06-07 12:40:13');

/*inserting 10 rows into tbl_book_post */
INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu') as x), 'Principles of Economics', 'N. Gregory Mankiw', '978-1305585126', 'This is an economics textbook. Contact me at (222)222-2222', 'Economics.PNG', '2020-01-01 10:10:10', NULL, TRUE);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x),'Programming the World Wide Web', 'Robert W. Sebesta', '978-0133775983', 'This is a web programming book. If you would like to purchase it, please contact me at (111)111-1111. Thank you.', 'ProgrammingWeb.PNG', '2020-11-10 23:52:23', NULL, TRUE);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'star.patrick@student.csulb.edu') as x),'Requirements Engineering', 'Axel van Lamsweerde', '978-0470012703', 'This is a engineering book. Contact me at (333)333-3333. Cheers.', 'REngineering.PNG', '2019-11-01 05:10:10', NULL, TRUE);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'trani001@cougars.csusm.edu') as x),'Intermediate Accounting', 'J. David Spiceland', '978-1260310177', 'I am selling an old accounting book. Contact me at (555)555-5555. Thank you.', 'Accounting.PNG', '2019-07-11 11:19:21', '2019-10-21 07:14:37', FALSE);

/*Intermediate Accountings's post is not visible because an Admin deleted it. For this reason, a record in the tbl_reviews table needs to be made*/
INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
VALUES (
		(SELECT AdminID FROM tbl_admin WHERE Email LIKE 'smithJohn@gmail.com'), 
		(SELECT PostID FROM tbl_book_post WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'trani001@cougars.csusm.edu') AND BookTitle LIKE 'Intermediate Accounting'),
		(SELECT UserID FROM tbl_user WHERE Email LIKE 'trani001@cougars.csusm.edu'),
		'Deleted Post',
        '2019-10-21 07:14:37'
);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'camin003@cougars.csusm.edu') as x),'Software Engineering', 'Ian Sommerville', '978-0133943038', 'This is a software engineering book. HML at (444)444-444 to buy. Thanks.', 'SEngineering.PNG', '2020-10-01 11:34:55', '2020-11-10 10:14:18', FALSE);

/*Software Engineering's post is not visible because an Admin deleted it. For this reason, a record in the tbl_reviews table needs to be made*/
INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
VALUES (
		(SELECT AdminID FROM tbl_admin WHERE Email LIKE 'brownsandy123@yahoo.com'), 
		(SELECT PostID FROM tbl_book_post WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'camin003@cougars.csusm.edu') AND BookTitle LIKE 'Software Engineering'),
		(SELECT UserID FROM tbl_user WHERE Email LIKE 'camin003@cougars.csusm.edu'),
		'Deleted Post',
        '2020-11-10 10:14:18'
);
INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu') as x),'International Business', 'Michael Geringer', '978-1259685224', 'This is a business book. Contact me at (777)777-7777 to buy it. Cheers.', 'Business.PNG', '2020-11-04 09:11:15', '2020-12-01 09:10:15', TRUE);

/*International Business's post added to reviews table because an Admin edited it.*/
INSERT INTO tbl_reviews(AdminID, PostID, UserID, ActionTaken, ActionDate)
VALUES (
		(SELECT AdminID FROM tbl_admin WHERE Email LIKE 'jacobs8907@gmail.com'), 
		(SELECT PostID FROM tbl_book_post WHERE UserID = (SELECT UserID FROM tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu') AND BookTitle LIKE 'International Business'),
		(SELECT UserID FROM tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu'),
		'Edited Post',
        '2020-12-01 09:10:15'
);

/*example of a user edit to a post*/
INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sharp032@cougars.csusm.edu') as x),'Human Anatomy', 'Michael McKinley', '978-1260251357', 'Currently looking to sell this anatomy book. Text or call at (888)888-8888 if interested. Thanks a lot!', 'Anatomy.PNG', '2019-03-01 08:34:51', '2019-03-01 09:00:00', TRUE);

/*example of a user 'deletion' of a post*/
INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'jonesy987@cougars.csusm.edu') as x),'The Science of Psychology: An Appreciative View', 'Laura King', '978-1259544378', 'Would like to sell this Psychology book. Text at (999)999-9999. Thanks a bunch!', 'Psych.PNG', '2020-07-11 10:32:11', '2020-08-01 07:09:18', FALSE);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'knight2112@csu.fullerton.edu') as x),'Art History', 'Marilyn Stokstad', '978-0205873487', 'Want to sell this art history book. Contact me at (211)123-1111. Thanks!', 'AHistory.PNG', '2019-06-07 07:33:41', NULL, TRUE);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, PostVisible)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'gonza593@cougars.csusm.edu') as x),'Photography: A Cultural History', 'Mary Warner Marien', '978-0205988945', 'Looking to sell this photography book. Text or call at (112)333-1212.', 'Photography.PNG', '2020-03-01 08:34:51', NULL, TRUE);


/*inserting 10 rows into tbl_saved_search*/
INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sharp032@cougars.csusm.edu') as x), 'Author', 'N. Gregory Mankiw');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu') as x), 'ISBN', '978-1305585126');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x), 'Title', 'Programming the World Wide Web');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu') as x), 'ISBN', '978-1259685224');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'gonza593@cougars.csusm.edu') as x), 'Title', 'International Business');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'knight2112@csu.fullerton.edu') as x), 'ISBN', '978-0470012703');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'camin003@cougars.csusm.edu') as x), 'Author', 'Mary Warner Marien');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'trani001@cougars.csusm.edu') as x), 'Author', 'Michael Geringer');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'star.patrick@student.csulb.edu') as x), 'Title', 'Human Anatomy');

INSERT INTO tbl_saved_search (UserID, SearchType, SearchTerm)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'jonesy987@cougars.csusm.edu') as x), 'ISBN', '978-0205988945');