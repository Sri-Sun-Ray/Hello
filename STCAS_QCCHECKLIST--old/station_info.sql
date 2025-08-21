-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2025 at 09:25 AM
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
-- Table structure for table `verify_serial_numbers_of_equipment_as_per_ic`
--

CREATE TABLE `verify_serial_numbers_of_equipment_as_per_ic` (
 `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
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
-- Table structure for table `station_tcas`
--

CREATE TABLE `station_tcas` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
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
-- Table structure for table `relay_installation_and_wiring`
--

CREATE TABLE `relay_installation_and_wiring` (
  `id` int(11) NOT NULL,
  `station_id` int(11) DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `station_name` varchar(50) NOT NULL,
  `railway_zone` varchar(50) NOT NULL,
  `division` varchar(100) NOT NULL,
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
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_id` int(11) NOT NULL,
  `station_name` varchar(255) NOT NULL,
  `railway_zone` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `initial_date` varchar(255) NOT NULL,
  `updated_date` date NOT NULL,
  `id` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `completed_time` datetime DEFAULT NULL
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

ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `tower_and_rtu`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `station_tcas`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `relay_installation_and_wiring`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `smocip`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `rfid_tags`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `station`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `station_id` (`station_id`),
  ADD UNIQUE KEY `unique_station_combo` (`station_id`,`railway_zone`,`division`);

ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `loginpage`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `report_versions`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

ALTER TABLE `loginpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `report_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `tower_and_rtu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `station_tcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `relay_installation_and_wiring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `smocip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `rfid_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
