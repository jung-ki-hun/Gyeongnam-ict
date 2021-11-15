-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.17


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema projectb
--

CREATE DATABASE IF NOT EXISTS projectb;
USE projectb;

--
-- Definition of table `air_database`
--

DROP TABLE IF EXISTS `air_database`;
CREATE TABLE `air_database` (
  `obid` int(11) DEFAULT NULL,
  `misae` double DEFAULT NULL,
  `temperature` double DEFAULT NULL,
  `humidity` double DEFAULT NULL,
  `is_turned_on` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `air_database`
--

/*!40000 ALTER TABLE `air_database` DISABLE KEYS */;
INSERT INTO `air_database` (`obid`,`misae`,`temperature`,`humidity`,`is_turned_on`) VALUES 
 (1,0.1,25.3,73,1);
/*!40000 ALTER TABLE `air_database` ENABLE KEYS */;


--
-- Definition of table `homepage`
--

DROP TABLE IF EXISTS `homepage`;
CREATE TABLE `homepage` (
  `hp_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`hp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `homepage`
--

/*!40000 ALTER TABLE `homepage` DISABLE KEYS */;
INSERT INTO `homepage` (`hp_id`,`name`,`email`,`message`,`data`,`title`) VALUES 
 (1,'rlgsn','1@1','what is computer','2021-10-15 02:09:36','computer version'),
 (2,'rlgsn','1@1','what is computer','2021-10-15 02:09:36','computer version'),
 (3,'rlgsn','1@1','what is computer','2021-10-15 02:09:36','computer version'),
 (4,'rlgsn','1@1','what is computer','2021-10-15 02:09:36','computer version'),
 (5,'kihun','kakak@naakaa.com','do you like java?','2021-10-15 02:09:36','java  class'),
 (6,'rlsngds','123123@nalaaa.com','rlgnsrlgsn','2021-10-15 02:09:36','rlgns'),
 (7,'rlsngds','123123@nalaaa.com','rlgnsrlgsn','2021-10-15 02:09:36','rlgns'),
 (8,'rlsngds','123123@nalaaa.com','rlgnsrlgsn','2021-10-15 02:09:36','rlgns'),
 (9,'rlsngds','123123@nalaaa.com','rlgnsrlgsn','2021-10-15 02:09:36','rlgns'),
 (10,'q','123123@nalaaa.com','index good','2021-10-15 02:27:28','q'),
 (11,'q','123123@nalaaa.com','q','2021-10-15 02:09:37','q'),
 (12,'q','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','q'),
 (13,'q','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','q'),
 (14,'q','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','qwewe'),
 (15,'q','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','qwewe'),
 (16,'qwewe','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','qwewe'),
 (17,'qwewe','123123@nalaaa.com','qwewe','2021-10-15 02:09:37','qwewe'),
 (18,'qwe','qwe','qwe','2021-10-15 02:09:37','qwe'),
 (19,'qwe','ew','ewq','2021-10-15 02:09:37','qwe'),
 (22,'hkh','123@123','acsc','2021-10-15 02:24:33','sgac'),
 (23,'kim','akrl@nals.com','slgjalclasjcoisjfnglcmslcsilmdhigbhnasf;jsfliasfpjgap\'jdgf','2021-10-15 02:27:22','rlbnlsvn'),
 (24,'kim','akrl@nals.com','slgjalclasjcoisjfnglcmslcsilmdhigbhnasf;jsfliasfpjgap\'jdgf','2021-10-15 02:27:22','rlbnlsvn'),
 (25,'123','123','123','2021-10-15 02:28:10','123'),
 (26,'123','123','123','2021-10-15 02:28:29','123'),
 (27,'qeqe','qeqe','qeqe','2021-10-15 02:28:46','qeqe'),
 (28,'www','ww','qeqeewqewwwe','2021-10-15 02:28:56','qeqewewew'),
 (29,'rlgns','lsjclscnl@nacla.com','rlgnslclksjdalahoighaclmsoihowqjdflsjvef','2021-10-15 02:28:57','rlgnslcskdj'),
 (30,'qwe','qwe','qwe','2021-10-15 02:30:01','qwe'),
 (31,'qwe','qwe','qwe','2021-10-15 02:30:01','qwe'),
 (32,'qqq','qqq@qqq','qqq','2021-10-17 14:16:22','qqq'),
 (33,'qwe','qwe@qwe','qwe','2021-10-17 14:17:14','qwe'),
 (34,'qwe','qwe@qwe','qwe','2021-10-17 14:17:14','qwe'),
 (35,'qwe','qwe@qwe','qwe','2021-10-17 14:17:18','qwe'),
 (36,'qwe','qwe@qwe','qwe','2021-10-17 14:17:18','qwe'),
 (37,'qwe','qwe@qwe','qwe','2021-10-17 14:17:29','qwe'),
 (38,'qwe','qwe@qwe','qwe','2021-10-17 14:17:29','qwe'),
 (39,'qwe','qwe@qwe','qwe','2021-10-17 14:17:36','qwe'),
 (40,'qwe','qwe@qwe','qwe','2021-10-17 14:17:36','qwe'),
 (41,'qweqwe','qweqwe','qweqwe','2021-10-17 14:17:43','qweqwe'),
 (42,'qweqwe','qweqwe@qwe','qweqwe','2021-10-17 14:17:50','qweqwe'),
 (43,'qweqwe','qweqwe@qwe','qweqwe','2021-10-17 14:17:50','qweqwe'),
 (44,'qweqwe','qweqwe@qwe','qweqwe','2021-10-17 14:17:58','qweqwe'),
 (45,'qweqwe','qweqwe@qwe','qweqwe','2021-10-17 14:17:58','qweqwe'),
 (46,'qweqwe','qwe@qweqwe','qweqwe','2021-10-17 14:18:04','qweqwe'),
 (47,'qweqwe','qwe@qweqwe','qweqwe','2021-10-17 14:18:04','qweqwe'),
 (48,'qweqwe','qwe@qweqwe@','qweqwe','2021-10-17 14:18:10','qweqwe'),
 (49,'qweqwe','qwe@qwe.qwe','qweqwe','2021-10-17 14:18:19','qweqwe'),
 (50,'qweqwe','qwe@qwe.qwe','qweqwe','2021-10-17 14:18:19','qweqwe'),
 (51,'qweqwe','qwe','qweqwe','2021-10-17 14:18:35','qweqwe'),
 (52,'qweqwe','qwe','qweqwe','2021-10-17 14:18:58','qweqwe'),
 (53,'qweqwe','qwe@qwe.qwe','qweqwe','2021-10-17 14:19:05','qweqwe'),
 (54,'qweqwe','qwe@qwe.qwe','qweqwe','2021-10-17 14:19:05','qweqwe'),
 (55,'qwe','qwe@qwe.qwe.','qwe','2021-10-17 14:19:23','qwe'),
 (56,'qwe','qwe@','qwe','2021-10-17 14:19:31','qwe');
/*!40000 ALTER TABLE `homepage` ENABLE KEYS */;


--
-- Definition of table `marketlist`
--

DROP TABLE IF EXISTS `marketlist`;
CREATE TABLE `marketlist` (
  `ml_id` int(11) NOT NULL AUTO_INCREMENT,
  `Market` tinyint(1) DEFAULT NULL,
  `UserName` varchar(30) DEFAULT NULL,
  `Product` varchar(30) DEFAULT NULL,
  `Mcount` int(11) DEFAULT NULL,
  `Mdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ml_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marketlist`
--

/*!40000 ALTER TABLE `marketlist` DISABLE KEYS */;
INSERT INTO `marketlist` (`ml_id`,`Market`,`UserName`,`Product`,`Mcount`,`Mdate`) VALUES 
 (1,1,'UserName01','Product01',1,'2021-10-13 22:27:44'),
 (2,2,'UserName02','Product02',2,'2021-10-13 22:37:47');
/*!40000 ALTER TABLE `marketlist` ENABLE KEYS */;


--
-- Definition of table `orderhistory`
--

DROP TABLE IF EXISTS `orderhistory`;
CREATE TABLE `orderhistory` (
  `oh_id` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) DEFAULT NULL,
  `UserName` varchar(30) DEFAULT NULL,
  `Mdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orderhistory`
--

/*!40000 ALTER TABLE `orderhistory` DISABLE KEYS */;
INSERT INTO `orderhistory` (`oh_id`,`price`,`UserName`,`Mdate`) VALUES 
 (1,1,'username','2021-10-13 22:27:57'),
 (2,321,'name01','2021-10-13 22:32:43'),
 (3,1,'name01','2021-10-13 22:33:03'),
 (4,10,'name01','2021-10-14 20:33:21'),
 (5,123,'name01','2021-10-14 20:34:26'),
 (6,10,'name01','2021-10-14 22:44:50'),
 (7,2,'name01','2021-10-15 02:33:46');
/*!40000 ALTER TABLE `orderhistory` ENABLE KEYS */;


--
-- Definition of table `outproduct`
--

DROP TABLE IF EXISTS `outproduct`;
CREATE TABLE `outproduct` (
  `qr_code` varchar(30) DEFAULT NULL,
  `count` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outproduct`
--

/*!40000 ALTER TABLE `outproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `outproduct` ENABLE KEYS */;


--
-- Definition of table `qrcode_database`
--

DROP TABLE IF EXISTS `qrcode_database`;
CREATE TABLE `qrcode_database` (
  `count_number` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `qr_code` varchar(30) DEFAULT NULL,
  `QRcode_check` tinyint(1) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `Location` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`count_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qrcode_database`
--

/*!40000 ALTER TABLE `qrcode_database` DISABLE KEYS */;
INSERT INTO `qrcode_database` (`count_number`,`name`,`qr_code`,`QRcode_check`,`price`,`stock`,`Location`) VALUES 
 (1,'name01','qr_code01',1,1,168,'location01'),
 (2,'name02','qr_code02',2,2,2,'location02');
/*!40000 ALTER TABLE `qrcode_database` ENABLE KEYS */;


--
-- Definition of table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` (`session_id`,`expires`,`data`) VALUES 
 (0x72714967474F33456F7A566D7668484F44677246704F70693465355A397A3479,1634533832,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D),
 (0x73666C2D7770685F4665313643355655474D5A524B6D726E324E50434D4D3139,1634534988,0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A6E756C6C2C2265787069726573223A6E756C6C2C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;


--
-- Definition of table `user_database`
--

DROP TABLE IF EXISTS `user_database`;
CREATE TABLE `user_database` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_database`
--

/*!40000 ALTER TABLE `user_database` DISABLE KEYS */;
INSERT INTO `user_database` (`u_id`,`user_email`,`user_name`,`user_password`) VALUES 
 (1,'1@1','rlgns','1234'),
 (2,'qwe@qwe','qwe','qwe'),
 (3,'2@2','eudhns','1234'),
 (4,'qwe@qwe.qwe','qwe','qwe'),
 (7,'asd123@naver.com','qweqwe','123456789'),
 (8,'qwer1234@naver.com','qwer','qwer1234'),
 (9,'qwe','qwe','qwe'),
 (10,'qewe','qewe','qewe'),
 (11,'qwer1234@naver.com','Hong GilDong','qwer1234'),
 (12,'3@3','ccndks','123456');
/*!40000 ALTER TABLE `user_database` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
