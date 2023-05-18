CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_username` varchar(16) COLLATE utf8_bin NOT NULL,
  `u_password` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_fname` varchar(50) COLLATE utf8_bin NOT NULL,
  `user_lname` varchar(50) COLLATE utf8_bin NOT NULL,
  `user_sign` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `shop` (
  `r_shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_shop_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `r_shop_address` varchar(300) COLLATE utf8_bin NOT NULL,
  `r_shop_by` int(11) NOT NULL,
  `r_shop_like` int(11) NOT NULL,
  `shop_approved` int(11) NOT NULL,
  PRIMARY KEY (`r_shop_id`),
  KEY `recommend_by_user_idx` (`r_shop_by`),
  CONSTRAINT `recommend_by_user` FOREIGN KEY (`r_shop_by`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `problem` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_ref_id` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `context` varchar(300) COLLATE utf8_bin NOT NULL COMMENT 'ไว้บอกหัวข้อหรือจุดรายละเอียด',
  `answer` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT 'ไว้ใส่คำตอบส่วนของ',
  PRIMARY KEY (`problem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `member` (
  `Member_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Member_Name` varchar(40) COLLATE utf8_bin NOT NULL,
  `Member_Lname` varchar(40) COLLATE utf8_bin NOT NULL,
  `Member_Alias` varchar(20) COLLATE utf8_bin NOT NULL,
  `Username` varchar(20) COLLATE utf8_bin NOT NULL,
  `Password` varchar(16) COLLATE utf8_bin NOT NULL,
  `Email` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Member_ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `Member_Alias_UNIQUE` (`Member_Alias`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `blogs` (
  `Blog_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Blog_Title` varchar(45) COLLATE utf8_bin NOT NULL,
  `Blog_Content` varchar(10000) COLLATE utf8_bin NOT NULL,
  `Blog_Banner` varchar(200) COLLATE utf8_bin NOT NULL,
  `Status` int(11) NOT NULL,
  `Pin` int(11) NOT NULL,
  `View_Count` int(11) NOT NULL,
  `Create_Date` datetime NOT NULL,
  `Create_User_ID` int(11) NOT NULL,
  PRIMARY KEY (`Blog_ID`),
  KEY `Blog_owner_idx` (`Create_User_ID`),
  CONSTRAINT `Blog_owner` FOREIGN KEY (`Create_User_ID`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `admin` (
  `Admin_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Admin_Name` varchar(45) COLLATE utf8_bin NOT NULL,
  `Admin_Lname` varchar(45) COLLATE utf8_bin NOT NULL,
  `Admin_Alias` varchar(45) COLLATE utf8_bin NOT NULL,
  `Username` varchar(16) COLLATE utf8_bin NOT NULL,
  `Password` varchar(16) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Admin_ID_UNIQUE` (`Admin_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 