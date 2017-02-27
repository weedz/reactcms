-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.19-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5143
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for reactcms
CREATE DATABASE IF NOT EXISTS `reactcms` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `reactcms`;

-- Dumping structure for table reactcms.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL DEFAULT '0',
  `intro` longtext NOT NULL,
  `content` longtext NOT NULL,
  `timestamp` int(11) NOT NULL,
  `author_name` varchar(128) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table reactcms.news: ~3 rows (approximately)
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`id`, `title`, `intro`, `content`, `timestamp`, `author_name`, `author_id`) VALUES
	(1, 'test', 'Test article', 'test', 0, '', 0),
	(2, 'test 2', 'Test article 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam scelerisque quis eros nec gravida. Mauris vitae sem sit amet nibh suscipit eleifend et vitae nisi. Nunc at consectetur sapien, et aliquam ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus dictum felis nec scelerisque dignissim. Suspendisse sed porttitor nulla, sed dignissim sapien. In augue elit, ultricies quis ultricies vel, tincidunt in nibh. Maecenas nibh ante, tincidunt eleifend luctus ac, hendrerit quis nisi. Quisque volutpat ligula tortor. Sed non odio sit amet nisl suscipit volutpat in viverra quam. Suspendisse sagittis, justo eget rhoncus volutpat, odio odio placerat eros, in venenatis nibh odio quis risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, '', 0),
	(3, 'test3', 'Test article 3', 'test 3', 0, '', 0);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;

-- Dumping structure for table reactcms.wiki
CREATE TABLE IF NOT EXISTS `wiki` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(50) NOT NULL DEFAULT '0',
  `title` varchar(128) NOT NULL DEFAULT '0',
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link` (`link`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table reactcms.wiki: ~0 rows (approximately)
/*!40000 ALTER TABLE `wiki` DISABLE KEYS */;
/*!40000 ALTER TABLE `wiki` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
