-- --------------------------------------------------------
-- Host:                         canmart.ctj2n9izy3ec.ap-south-1.rds.amazonaws.com
-- Server version:               8.0.33 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table canmart.BussinessDetail
CREATE TABLE IF NOT EXISTS `BussinessDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1_userID1` (`user_id`),
  CONSTRAINT `FK1_userID1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table canmart.Category
CREATE TABLE IF NOT EXISTS `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `is_product` tinyint DEFAULT '1',
  `is_parent_category` tinyint DEFAULT '0',
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_category_id` (`parent_category_id`),
  CONSTRAINT `FK_Category_Category` FOREIGN KEY (`parent_category_id`) REFERENCES `Category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table canmart.Enquiry
CREATE TABLE IF NOT EXISTS `Enquiry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `mobile` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Enquiry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table canmart.Message
CREATE TABLE IF NOT EXISTS `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL,
  `sent_user_id` int NOT NULL,
  `reciver_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sent_user_id` (`sent_user_id`),
  KEY `reciver_user_id` (`reciver_user_id`),
  CONSTRAINT `FK_Message_Users` FOREIGN KEY (`sent_user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `FK_Message_Users_2` FOREIGN KEY (`reciver_user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table canmart.Products
CREATE TABLE IF NOT EXISTS `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `quantity` varchar(50) NOT NULL DEFAULT '',
  `created_at` date NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  `child_category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `is_product` tinyint(1) DEFAULT '1',
  `is_active` tinyint(1) DEFAULT '1',
  `unique_id` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `product_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_category_id` (`parent_category_id`),
  KEY `child_category_id` (`child_category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `Category` (`id`),
  CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`child_category_id`) REFERENCES `Category` (`id`),
  CONSTRAINT `Products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table canmart.TaxInformation
CREATE TABLE IF NOT EXISTS `TaxInformation` (
  `id` int NOT NULL,
  `business_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `issued_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK__Users2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table canmart.TypeService
CREATE TABLE IF NOT EXISTS `TypeService` (
  `id` int NOT NULL AUTO_INCREMENT,
  `business_type` varchar(100) DEFAULT NULL,
  `payment_type` varchar(100) DEFAULT NULL,
  `start_week` varchar(30) DEFAULT NULL,
  `end_week` varchar(30) DEFAULT NULL,
  `start_time` varchar(30) DEFAULT NULL,
  `end_time` varchar(30) DEFAULT NULL,
  `exclude_city` varchar(200) DEFAULT NULL,
  `include_city` varchar(200) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK__Users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table canmart.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `unique_id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL DEFAULT '',
  `country_code` int NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_company` tinyint DEFAULT '1',
  `role` varchar(20) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `device_token` varchar(255) NOT NULL,
  `profile` varchar(500) DEFAULT NULL,
  `parent_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Users_Users` (`parent_user_id`),
  CONSTRAINT `FK_Users_Users` FOREIGN KEY (`parent_user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
