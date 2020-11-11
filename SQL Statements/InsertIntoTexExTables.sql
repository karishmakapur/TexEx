/*inserting 10 rows into tbl_user*/
INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Marcos Lopez', 'lopez816@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword1', FALSE, FALSE, '2019-12-31 23:40:10', NULL, NULL, NULL, 'Admin', NULL);

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Karishma Kapur', 'kapur004@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword2', FALSE, FALSE, '2020-01-01 13:10:10', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Peter Sharp', 'sharp032@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword3', FALSE, FALSE, '2019-12-31 23:40:10', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Pascaul Sebastian', 'sebas004@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword4', FALSE, FALSE, '2020-01-01 05:10:10', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Arianna Camino', 'camin003@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword5', FALSE, FALSE, '2020-01-01 13:10:10', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Michael Trani', 'trani001@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword6', FALSE, FALSE, '2020-4-21 1:59:59', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Benjamin Gonzalez', 'gonza593@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword7', FALSE, FALSE, '2020-10-10 23:50:23', NULL, NULL, NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Kotonya Knight', 'knight2112@csu.fullerton.edu', 'California State University Fullerton', 'P@ssword8', FALSE, TRUE, '2019-11-30 23:50:23', NULL, '2020-01-01 05:10:10', NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Kelly Jones', 'jonesy987@cougars.csusm.edu', 'California State University San Marcos', 'P@ssword9', FALSE, TRUE, '2020-1-05 12:50:23', NULL, '2020-01-01 05:10:10', NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

INSERT INTO tbl_user (Name, Email, School, Password, Disabled, Locked, CreationDate, DisabledDate, LockedDate, UpdatedDate, Role, AdminID)
VALUES ('Patrick Star', 'star.patrick@student.csulb.edu', 'California State University Long Beach', 'P@ssword10', FALSE, TRUE, '2020-3-08 10:32:20', NULL, '2020-06-07 12:40:13', NULL, 'User', (SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Role LIKE 'Admin') as x));

/*inserting 10 rows into tbl_book_post */
INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sebas004@cougars.csusm.edu') as x), 'Principles of Economics', 'N. Gregory Mankiw', '978-1305585126', 'This is an economics textbook. Contact me at (222)222-2222', 'Economics.PNG', '2020-01-01 10:10:10', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'lopez816@cougars.csusm.edu') as x),'Programming the World Wide Web', 'Robert W. Sebesta', '978-0133775983', 'This is a web programming book. If you would like to purchase it, please contact me at (111)111-1111. Thank you.', 'ProgrammingWeb.PNG', '2020-11-10 23:52:23', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'star.patrick@student.csulb.edu') as x),'Requirements Engineering', 'Axel van Lamsweerde', '978-0470012703', 'This is a engineering book. Contact me at (333)333-3333. Cheers.', 'REngineering.PNG', '2019-11-01 05:10:10', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'trani001@cougars.csusm.edu') as x),'Intermediate Accounting', 'J. David Spiceland', '978-1260310177', 'I am selling an old accounting book. Contact me at (555)555-5555. Thank you.', 'Accounting.PNG', '2019-07-11 11:19:21', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'camin003@cougars.csusm.edu') as x),'Software Engineering', 'Ian Sommerville', '978-0133943038', 'This is a software engineering book. HML at (444)444-444 to buy. Thanks.', 'SEngineering.PNG', '2020-10-01 11:34:55', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'kapur004@cougars.csusm.edu') as x),'International Business', 'Michael Geringer', '978-1259685224', 'This is a business book. Contact me at (777)777-7777 to buy it. Cheers.', 'Business.PNG', '2020-12-04 09:11:15', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'sharp032@cougars.csusm.edu') as x),'Human Anatomy', 'Michael McKinley', '978-1260251357', 'Currently looking to sell this anatomy book. Text or call at (888)888-8888 if interested. Thanks a lot!', 'Anatomy.PNG', '2019-03-01 08:34:51', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'jonesy987@cougars.csusm.edu') as x),'The Science of Psychology: An Appreciative View', 'Laura King', '978-1259544378', 'Would like to sell this Psychology book. Text at (999)999-9999. Thanks a bunch!', 'Psych.PNG', '2020-07-11 10:32:11', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'knight2112@csu.fullerton.edu') as x),'Art History', 'Marilyn Stokstad', '978-0205873487', 'Want to sell this art history book. Contact me at (211)123-1111. Thanks!', 'AHistory.PNG', '2019-06-07 07:33:41', NULL, NULL);

INSERT INTO tbl_book_post (UserID, BookTitle, BookAuthor, BookISBN, PostContent, BookImage, PostedStamp, LastUpdated, UpdatedBy)
VALUES ((SELECT x.UserID FROM (SELECT UserID FROM tbl_user WHERE Email LIKE 'gonza593@cougars.csusm.edu') as x),'Photography: A Cultural History', 'Mary Warner Marien', '978-0205988945', 'Looking to sell this photography book. Text or call at (112)333-1212.', 'Photography.PNG', '2020-03-01 08:34:51', NULL, NULL);

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