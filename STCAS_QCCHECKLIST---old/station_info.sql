-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2025 at 10:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `station_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `general and safety`
--

CREATE TABLE `general and safety` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `entity_type` varchar(100) NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `image_path` varchar(5000) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loginpage`
--

CREATE TABLE `loginpage` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loginpage`
--

INSERT INTO `loginpage` (`id`, `username`, `employee_name`, `phone_number`, `password`, `role`) VALUES
(6, '52477', 'sushma', '5675446892', '52477', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `relay installation and wiring`
--

CREATE TABLE `relay installation and wiring` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `upload_date` timestamp NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report_versions`
--

CREATE TABLE `report_versions` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `latest_version` int(11) DEFAULT 1,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rfid tags`
--

CREATE TABLE `rfid tags` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `smocip`
--

CREATE TABLE `smocip` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_id` int(11) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `start_time` datetime NOT NULL,
  `completed_time` datetime NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_id`, `station_name`, `railway_zone`, `division`, `initial_date`, `updated_date`, `start_time`, `completed_time`, `id`) VALUES
(0, 'Her', 'NCR', 'Jhansi', '2025-08-12', '2025-08-12', '2025-08-12 15:13:09', '2025-08-12 15:13:09', 1),
(34567, 'fgrtuy', 'ECR', 'Pt Deendayal Upadhy - Pradhankhnta', '2025-08-12', '2025-08-12', '2025-08-12 16:32:39', '2025-08-12 16:32:39', 2),
(57578, 'ffdfgu', 'ER', 'Howrah-COO', '2025-08-12', '2025-08-12', '2025-08-12 16:38:35', '2025-08-12 16:38:35', 3),
(357855, 'dfgfvnu', 'ER', 'Howrah-COO', '2025-08-12', '2025-08-12', '2025-08-12 16:44:24', '2025-08-12 16:44:24', 4),
(463368, 'vftufb', 'ECR', 'Pt Deendayal Upadhy - Pradhankhnta', '2025-08-12', '2025-08-12', '2025-08-12 16:44:48', '2025-08-12 16:44:48', 5),
(455356, 'dffvgy', 'ECR', 'Pt Deendayal Upadhy - Pradhankhnta', '2025-08-12', '2025-08-12', '2025-08-12 16:49:31', '2025-08-12 16:49:31', 6),
(45456, 'ffefg', 'ECR', 'Nagpur', '2025-08-12', '2025-08-12', '2025-08-12 16:52:53', '2025-08-12 16:52:53', 7),
(46477, 'fgrtuy', 'ER', 'Howrah-COO', '2025-08-12', '2025-08-12', '2025-08-12 17:18:28', '2025-08-12 17:18:28', 8),
(46675, 'xfdsd', 'CR', 'Mumbai', '2025-08-12', '2025-08-12', '2025-08-12 18:00:26', '2025-08-12 18:00:26', 9),
(45678, 'frffgg', 'ER', 'Howrah-COO', '2025-08-13', '2025-08-13', '2025-08-13 11:04:44', '2025-08-13 11:04:44', 10);

-- --------------------------------------------------------

--
-- Table structure for table `station tcas`
--

CREATE TABLE `station tcas` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tower and rtu`
--

CREATE TABLE `tower and rtu` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verify_serial_numbers_of_equipment_as_per_ic`
--

CREATE TABLE `verify_serial_numbers_of_equipment_as_per_ic` (
  `id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(10) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` date NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `image_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image_paths`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `general and safety`
--
ALTER TABLE `general and safety`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_general_safety_station_id` (`station_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_images_station_id` (`station_id`);

--
-- Indexes for table `loginpage`
--
ALTER TABLE `loginpage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relay installation and wiring`
--
ALTER TABLE `relay installation and wiring`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_relay_station_id` (`station_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_versions`
--
ALTER TABLE `report_versions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_report_versions_station_id` (`station_id`);

--
-- Indexes for table `rfid tags`
--
ALTER TABLE `rfid tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rfid_tags_station_id` (`station_id`);

--
-- Indexes for table `smocip`
--
ALTER TABLE `smocip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_smocip_station_id` (`station_id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Station_Id` (`station_id`),
  ADD UNIQUE KEY `unique_station_combo` (`station_id`,`station_name`,`railway_zone`,`division`);

--
-- Indexes for table `station tcas`
--
ALTER TABLE `station tcas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_station_tcas_id` (`station_id`);

--
-- Indexes for table `tower and rtu`
--
ALTER TABLE `tower and rtu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tower_rtu_station_id` (`station_id`);

--
-- Indexes for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_verify_station_id` (`station_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `general and safety`
--
ALTER TABLE `general and safety`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `loginpage`
--
ALTER TABLE `loginpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `relay installation and wiring`
--
ALTER TABLE `relay installation and wiring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `report_versions`
--
ALTER TABLE `report_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rfid tags`
--
ALTER TABLE `rfid tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `smocip`
--
ALTER TABLE `smocip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `station tcas`
--
ALTER TABLE `station tcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `tower and rtu`
--
ALTER TABLE `tower and rtu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `general and safety`
--
ALTER TABLE `general and safety`
  ADD CONSTRAINT `fk_general_safety_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_images_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `relay installation and wiring`
--
ALTER TABLE `relay installation and wiring`
  ADD CONSTRAINT `fk_relay_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `report_versions`
--
ALTER TABLE `report_versions`
  ADD CONSTRAINT `fk_report_versions_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rfid tags`
--
ALTER TABLE `rfid tags`
  ADD CONSTRAINT `fk_rfid_tags_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `smocip`
--
ALTER TABLE `smocip`
  ADD CONSTRAINT `fk_smocip_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `station tcas`
--
ALTER TABLE `station tcas`
  ADD CONSTRAINT `fk_station_tcas_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tower and rtu`
--
ALTER TABLE `tower and rtu`
  ADD CONSTRAINT `fk_tower_rtu_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  ADD CONSTRAINT `fk_verify_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
