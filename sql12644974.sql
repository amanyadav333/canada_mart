-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freesqldatabase.com
-- Generation Time: Sep 12, 2023 at 08:41 AM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12644974`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Medicine'),
(2, 'Tablet'),
(3, 'Syrup');

-- --------------------------------------------------------

--
-- Table structure for table `Enquiry`
--

CREATE TABLE `Enquiry` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `mobile` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Enquiry`
--

INSERT INTO `Enquiry` (`id`, `name`, `description`, `mobile`, `user_id`) VALUES
(1, 'aman', 'vjnvev fefn ovj ', 1234567890, 2),
(2, 'aman2', 'vjnvev fefn ovj ', 1234567890, 2),
(3, 'aman2', 'vjnvev fefn ovj ', 1234567890, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `parent_category_id` int(11) DEFAULT NULL,
  `child_category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_product` tinyint(1) DEFAULT '1',
  `is_active` tinyint(1) DEFAULT '1',
  `unique_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `name`, `description`, `price`, `quantity`, `created_at`, `parent_category_id`, `child_category_id`, `user_id`, `is_product`, `is_active`, `unique_id`) VALUES
(2, 'Comcal MZ Tablet', ' Calcium cirtrate 1000mg\r\nMangesium hydroxide 100mg\r\nZinc Sulphate monomohydrate 4mg\r\nVitamin D3', 200, 1, '0000-00-00', 1, 2, 2, 1, 1, ''),
(3, 'CDS Drops', ' Alpha Amylase I.P. 20mg\r\n(Bacterial 1:800)\r\nPapain I.P. 10mg\r\nDil Oil B.P. 2mg\r\nAnise Oil B.P. 2mg\r\nCaraway Oil B.P. 2mg\r\nColour: Sunset Yellow', 1100, 1, '0000-00-00', 1, 3, 2, 1, 1, ''),
(4, 'Ecodil - DH Syrup', 'Dextromethorphan Hydrobromide 10 mg\r\nPhenylephrin Hydrochloride 5 mg\r\nChorpheniramine Maleate', 950, 1, '0000-00-00', 1, 3, 2, 1, 1, ''),
(5, 'Muconil Syrup -100ml / 50ml', 'Ambroxol Hcl 15mg\r\nTerbutaline Sulphate 1.25mg\r\nGuaiphenesin 50mg\r\nMenthol', 3450, 1, '0000-00-00', 1, 3, 2, 1, 1, ''),
(6, 'EMS Tablet', 'Doxylamine succinate 10 mg\r\nPyridoxine Hcl. 10 mg\r\nFolic Acid ', 340, 1, '0000-00-00', 1, 2, 2, 1, 1, ''),
(7, 'Sofer -12 Tablet', 'Sodium Feredate 231mg\r\nFolic Acid 15mg\r\nVitamin B-12 ', 940, 1, '0000-00-00', 1, 2, 2, 1, 1, ''),
(8, 'Sofer Drops', 'Sodium Feredate 231mg\r\nFolic Acid 15mg\r\nVitamin B-12 ', 420, 1, '0000-00-00', 1, 3, 2, 1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `unique_id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` int(15) NOT NULL,
  `country_code` int(5) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `device_token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `company_name`, `unique_id`, `email`, `mobile`, `country_code`, `is_active`, `created_at`, `updated_at`, `device_token`) VALUES
(2, 'aman', 'aman1234567890am2a3n@ewe.e', 'am2a3n@ewe.e', 1234567890, 21, 1, '2023-09-08', '2023-09-08', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Enquiry`
--
ALTER TABLE `Enquiry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_category_id` (`parent_category_id`),
  ADD KEY `child_category_id` (`child_category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Enquiry`
--
ALTER TABLE `Enquiry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Enquiry`
--
ALTER TABLE `Enquiry`
  ADD CONSTRAINT `Enquiry_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`parent_category_id`) REFERENCES `Category` (`id`),
  ADD CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`child_category_id`) REFERENCES `Category` (`id`),
  ADD CONSTRAINT `Products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
