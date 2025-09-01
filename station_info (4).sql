-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2025 at 02:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `entity_type` varchar(100) NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `station_id` varchar(50) DEFAULT NULL,
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
(1, '52667', 'surya', '8328578878', '52667', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `relay_installation_and_wiring`
--

CREATE TABLE `relay_installation_and_wiring` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
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
-- Table structure for table `rfid_ps_unit`
--

CREATE TABLE `rfid_ps_unit` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rfid_tags`
--

CREATE TABLE `rfid_tags` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `smocip`
--

CREATE TABLE `smocip` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
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
  `railway_zone` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `section_name` varchar(255) NOT NULL DEFAULT '',
  `initial_date` varchar(255) NOT NULL,
  `updated_date` date NOT NULL,
  `id` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `completed_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_id`, `station_name`, `railway_zone`, `division`, `section_name`, `initial_date`, `updated_date`, `id`, `start_time`, `completed_time`) VALUES
(342, 'dgdv', 'ER', 'Howrah-COO', 'xcgdfg', '2025-09-01', '2025-09-01', 12, '2025-09-01 12:20:59', '2025-09-01 12:20:59'),
(3534354, 'ghfjfghj', 'CR', 'Mumbai', 'jghjghj', '2025-09-01', '2025-09-01', 13, '2025-09-01 14:38:15', '2025-09-01 14:38:15');

-- --------------------------------------------------------

--
-- Table structure for table `station_tcas`
--

CREATE TABLE `station_tcas` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tower_and_rtu`
--

CREATE TABLE `tower_and_rtu` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verify_serial_numbers_of_equipment_as_per_ic`
--

CREATE TABLE `verify_serial_numbers_of_equipment_as_per_ic` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
  `section_name` varchar(100) NOT NULL DEFAULT '',
  `initial_date` varchar(100) NOT NULL,
  `updated_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loginpage`
--
ALTER TABLE `loginpage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relay_installation_and_wiring`
--
ALTER TABLE `relay_installation_and_wiring`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_versions`
--
ALTER TABLE `report_versions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rfid_ps_unit`
--
ALTER TABLE `rfid_ps_unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rfid_tags`
--
ALTER TABLE `rfid_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smocip`
--
ALTER TABLE `smocip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `station_id` (`station_id`),
  ADD UNIQUE KEY `unique_station_combo` (`station_id`,`railway_zone`,`division`);

--
-- Indexes for table `station_tcas`
--
ALTER TABLE `station_tcas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tower_and_rtu`
--
ALTER TABLE `tower_and_rtu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loginpage`
--
ALTER TABLE `loginpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `relay_installation_and_wiring`
--
ALTER TABLE `relay_installation_and_wiring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report_versions`
--
ALTER TABLE `report_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rfid_ps_unit`
--
ALTER TABLE `rfid_ps_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rfid_tags`
--
ALTER TABLE `rfid_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `smocip`
--
ALTER TABLE `smocip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `station_tcas`
--
ALTER TABLE `station_tcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tower_and_rtu`
--
ALTER TABLE `tower_and_rtu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
