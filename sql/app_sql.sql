-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: task_manager
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `task_manager`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `task_manager` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `task_manager`;

--
-- Table structure for table `people_handle_tasks`
--

DROP TABLE IF EXISTS `people_handle_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people_handle_tasks` (
  `task_id` varchar(40) NOT NULL,
  `people` varchar(255) NOT NULL,
  KEY `task_id` (`task_id`),
  KEY `people` (`people`),
  CONSTRAINT `people_handle_tasks_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  CONSTRAINT `people_handle_tasks_ibfk_2` FOREIGN KEY (`people`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people_handle_tasks`
--

LOCK TABLES `people_handle_tasks` WRITE;
/*!40000 ALTER TABLE `people_handle_tasks` DISABLE KEYS */;
INSERT INTO `people_handle_tasks` VALUES ('0','Zizhao Li'),('2','Zizhao Li'),('1','Zizhao Li'),('0','Darth Sidious'),('1','Batman bin Superman');
/*!40000 ALTER TABLE `people_handle_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` varchar(40) NOT NULL,
  `dueday` varchar(20) NOT NULL,
  `title` text,
  `type` varchar(255) DEFAULT 'html',
  `content` longtext,
  `done` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('0','2020-06-20T19:30','A unique title!','js','Basically it is a task. This is the content!',0),('1','2020-06-10T18:30','Done!','html','Basically it is a task which is done',1),('2','2020-06-25T14:30','Quack!','sql','Duce nuked em!',0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `character` tinyint(4) DEFAULT '0',
  `username` varchar(255) NOT NULL,
  `pwordhash` varchar(64) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `preference` varchar(255) DEFAULT 'html',
  `pwordsalt` varchar(40) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `availability` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','85d04490df194a7956ef3542ca5f56d6709e9b8bf11fbfa7ea1ecf4c06a86883','04123456','a123456@gmail.com','js','850a7390-b52a-11ea-9231-ddebc1f918ba',NULL,1),(0,'Batman bin Superman','85d04490df194a7956ef3542ca5f56d6709e9b8bf11fbfa7ea1ecf4c06a86883','04034000','a1dadgda56@gmail.com','js','850a7390-b52a-11ea-9231-ddebc1f918ba',NULL,1),(0,'Darth Sidious','85d04490df194a7956ef3542ca5f56d6709e9b8bf11fbfa7ea1ecf4c06a86883','04000056','dadagddasfdg@gmail.com','html','850a7390-b52a-11ea-9231-ddebc1f918ba',NULL,1),(0,'Zizhao Li','85d04490df194a7956ef3542ca5f56d6709e9b8bf11fbfa7ea1ecf4c06a86883','04000006','lzzdeyouxiang@outlook.com','sql','850a7390-b52a-11ea-9231-ddebc1f918ba',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-12  1:39:01
