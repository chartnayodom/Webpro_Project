CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_username` varchar(16) COLLATE utf8_bin NOT NULL,
  `u_password` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `user_fname` varchar(50) COLLATE utf8_bin NOT NULL,
  `user_lname` varchar(50) COLLATE utf8_bin NOT NULL,
  `user_sign` varchar(30) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `u_username_UNIQUE` (`u_username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `admin` (
  `Admin_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Admin_Name` varchar(45) COLLATE utf8_bin NOT NULL,
  `Admin_Lname` varchar(45) COLLATE utf8_bin NOT NULL,
  `Admin_Alias` varchar(45) COLLATE utf8_bin NOT NULL,
  `Admin_Username` varchar(16) COLLATE utf8_bin NOT NULL,
  `Admin_Password` varchar(100) COLLATE utf8_bin NOT NULL,
  `Admin_Email` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  UNIQUE KEY `Username_UNIQUE` (`Admin_Username`),
  UNIQUE KEY `Admin_ID_UNIQUE` (`Admin_ID`),
  UNIQUE KEY `Admin_Email_UNIQUE` (`Admin_Email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `problem` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_ref_id` int(11) DEFAULT NULL,
  `context` varchar(300) COLLATE utf8_bin NOT NULL COMMENT 'ไว้บอกหัวข้อหรือจุดรายละเอียด',
  `answer` varchar(300) COLLATE utf8_bin DEFAULT NULL COMMENT 'ไว้ใส่คำตอบส่วนของ',
  PRIMARY KEY (`problem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `shop` (
  `r_shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_shop_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `r_shop_address` varchar(300) COLLATE utf8_bin NOT NULL,
  `r_shop_by` int(11) NOT NULL,
  `r_shop_like` int(11) NOT NULL,
  `shop_approved` int(11) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  PRIMARY KEY (`r_shop_id`),
  KEY `recommend_by_user_idx` (`r_shop_by`),
  CONSTRAINT `recommend_by_user` FOREIGN KEY (`r_shop_by`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(100) COLLATE utf8_bin NOT NULL,
  `role` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_UN` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
