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
  `Member_ID` int(11) NOT NULL,
  PRIMARY KEY (`Blog_ID`),
  KEY `Blog_owner_idxmembermember` (`Member_ID`),
  CONSTRAINT `Blog_owner` FOREIGN KEY (`Member_ID`) REFERENCES `member` (`Member_ID`)
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


