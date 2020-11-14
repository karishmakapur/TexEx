/*check user's credentials*/
SELECT Email, Password
FROM tbl_admin
WHERE Email LIKE 'brownsandy123@yahoo.com' and Password LIKE 'S@ndybr0wnzz';
