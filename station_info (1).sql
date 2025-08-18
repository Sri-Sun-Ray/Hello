-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2025 at 02:02 PM
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

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `station_id`, `entity_type`, `s_no`, `image_path`, `created_at`, `updated_at`) VALUES
(102, 31, 'relay_installation', '5.1', 'uploads/img_689dca3e064195.96046112.png', '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(103, 38, 'radio_power', '2.1', 'uploads/img_68a313d5098bb6.54833925.png', '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(104, 38, 'radio_power', '3.1', 'uploads/img_68a313e9b29470.95983349.png', '2025-08-18 11:52:11', '2025-08-18 11:52:11');

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
(9, '52667', 'surya', '8328578878', '52667', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `relay_installation_and_wiring`
--

CREATE TABLE `relay_installation_and_wiring` (
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
-- Dumping data for table `relay_installation_and_wiring`
--

INSERT INTO `relay_installation_and_wiring` (`id`, `station_id`, `section_id`, `station_name`, `railway_zone`, `division`, `initial_date`, `updated_date`, `observation_text`, `remarks`, `s_no`, `observation_status`, `image_paths`, `created_at`, `updated_at`) VALUES
(242, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Visual Checks (Ferrules/ Stickering to be done for easily identification of cables).', '', '5.1', 'Yes', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(243, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Total Qty of Relay panels and repeater relays used.', '', '5.2', 'Select', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(244, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Verification of Relay rack and interfaces are connected as per relay wiring drawing.', '', '5.3', 'Select', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(245, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Verify slow blowing fuse placement and Fuse rating (2A)', '', '5.4', 'Select', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(246, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Verification of Relay Contact 24V supply (18VDA to 26VDA)', '', '5.5', 'Select', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31'),
(247, 31, '5_0', 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', 'Verification of Data Logger connectivity', '', '5.6', 'Select', NULL, '2025-08-14 11:36:31', '2025-08-14 11:36:31');

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
-- Table structure for table `rfid_tags`
--

CREATE TABLE `rfid_tags` (
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
(42444, 'cxvv', 'CR', 'Mumbai', '2025-08-14', '2025-08-14', '2025-08-14 17:06:18', '2025-08-14 17:06:18', 31),
(45673, 'Ragadi', 'CR', 'Mumbai', '2025-08-21', '2025-08-18', '2025-08-18 10:35:28', '2025-08-18 10:35:28', 32),
(789654, 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', '2025-08-18 11:28:30', '2025-08-18 11:28:30', 34),
(52667, 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', '2025-08-18 15:34:48', '2025-08-18 15:35:19', 35),
(90876, 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', '2025-08-18 15:38:11', '2025-08-18 15:38:11', 36),
(17626, 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', '2025-08-18 16:36:16', '2025-08-18 16:36:16', 37),
(678542, 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', '2025-08-18 17:03:15', '2025-08-18 17:03:15', 38);

-- --------------------------------------------------------

--
-- Table structure for table `station_tcas`
--

CREATE TABLE `station_tcas` (
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
-- Table structure for table `tower_and_rtu`
--

CREATE TABLE `tower_and_rtu` (
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
-- Dumping data for table `tower_and_rtu`
--

INSERT INTO `tower_and_rtu` (`id`, `station_id`, `section_id`, `station_name`, `railway_zone`, `division`, `initial_date`, `updated_date`, `observation_text`, `remarks`, `s_no`, `observation_status`, `image_paths`, `created_at`, `updated_at`) VALUES
(1, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Visual Checks', '', '3.1', 'Connected', NULL, '2025-08-18 11:52:10', '2025-08-18 11:52:10'),
(2, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of RF Antenna Fixing and LMR Cable Routing', '', '3.2', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(3, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of Antenna Fixing', '', '3.3', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(4, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verify the RF Cable joining to Antenna', '', '3.4', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(5, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Tie the cables to die pole antenna by using stainless steel cable tie at four locations.', '', '3.5', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(6, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'LMR 600 cables routing by using feeder clamps.', '', '3.6', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(7, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Installation of RTU Box and connections with identification', '', '3.7', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(8, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Visual inspection, Identification and Radios functioning', '', '3.8', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(9, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'LMR cable fixing', '', '3.9', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(10, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of RTU box Fixing on platform.', '', '3.10', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(11, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Tie the cables to structure by using stainless steel cable ties.', '', '3.11', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(12, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Radios power supply 110V', '', '3.12', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(13, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of RTU Earthing', '', '3.13', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(14, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of Tower', '', '3.14', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(15, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Tower Foundation &amp;amp; Fencing', '', '3.15', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(16, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Ladder Fixing', '', '3.16', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(17, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RTU Plat form entrance', '', '3.17', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(18, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'GI Earthing strip routing', '', '3.18', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(19, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of Tower and RTU Earth pit arrangement with brazing.', '', '3.19', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(20, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Earthing for Tower as per Spec. &amp;lt; 2Ω', '', '3.20', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11'),
(21, 38, '3_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Verification of Aviation Warning Lamp, Functioning and power supply 110V', '', '3.21', 'Select', NULL, '2025-08-18 11:52:11', '2025-08-18 11:52:11');

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
-- Dumping data for table `verify_serial_numbers_of_equipment_as_per_ic`
--

INSERT INTO `verify_serial_numbers_of_equipment_as_per_ic` (`id`, `station_id`, `section_id`, `station_name`, `railway_zone`, `division`, `initial_date`, `updated_date`, `observation_text`, `remarks`, `s_no`, `observation_status`, `image_paths`, `created_at`, `updated_at`) VALUES
(1, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Present', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(2, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(3, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(4, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(5, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(6, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(7, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(8, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(9, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(10, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(11, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(12, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(13, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(14, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(15, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(16, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(17, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(18, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(19, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(20, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(21, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 05:05:54', '2025-08-18 05:05:54'),
(22, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(23, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(24, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(25, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(26, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(27, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(28, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(29, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(30, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(31, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(32, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(33, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(34, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(35, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(36, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(37, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(38, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(39, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(40, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(41, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(42, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(43, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(44, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(45, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(46, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(47, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 05:05:55', '2025-08-18 05:05:55'),
(48, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 05:05:56', '2025-08-18 05:05:56'),
(49, 32, '2_0', 'Ragadi', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 05:05:56', '2025-08-18 05:05:56'),
(148, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Present', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(149, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(150, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(151, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(152, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(153, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(154, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(155, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(156, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(157, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(158, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(159, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(160, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(161, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(162, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(163, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(164, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(165, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(166, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(167, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(168, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(169, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(170, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(171, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(172, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(173, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 05:58:39', '2025-08-18 05:58:39'),
(174, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(175, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(176, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(177, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(178, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(179, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(180, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(181, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(182, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(183, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(184, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(185, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(186, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(187, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(188, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(189, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(190, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(191, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(192, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(193, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(194, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(195, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(196, 34, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 05:58:40', '2025-08-18 05:58:40'),
(834, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Present', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(835, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(836, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(837, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(838, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(839, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(840, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(841, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(842, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(843, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(844, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(845, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(846, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(847, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(848, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(849, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(850, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(851, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(852, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(853, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(854, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(855, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(856, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(857, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(858, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(859, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(860, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 10:04:55', '2025-08-18 10:04:55'),
(861, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(862, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(863, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(864, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(865, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(866, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(867, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(868, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(869, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(870, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(871, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(872, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(873, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(874, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(875, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(876, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(877, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(878, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(879, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(880, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(881, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(882, 35, '2_0', 'Guntur 1', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 10:04:56', '2025-08-18 10:04:56'),
(883, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Not Present', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(884, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(885, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(886, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(887, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(888, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(889, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(890, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(891, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(892, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(893, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(894, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(895, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(896, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(897, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(898, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(899, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(900, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(901, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(902, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 10:08:31', '2025-08-18 10:08:31'),
(903, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(904, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(905, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(906, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(907, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(908, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(909, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(910, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(911, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(912, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(913, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(914, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(915, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(916, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(917, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(918, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(919, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(920, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(921, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(922, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(923, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(924, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(925, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(926, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(927, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(928, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(929, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(930, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(931, 36, '2_0', 'surya', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 10:08:32', '2025-08-18 10:08:32'),
(932, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Not Present', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(933, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(934, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(935, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(936, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(937, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:06:28', '2025-08-18 11:06:28'),
(938, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(939, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(940, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(941, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(942, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(943, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(944, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(945, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(946, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(947, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(948, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(949, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(950, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(951, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(952, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(953, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(954, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(955, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(956, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(957, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(958, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(959, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(960, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(961, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(962, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(963, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:06:29', '2025-08-18 11:06:29'),
(964, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(965, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(966, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(967, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(968, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(969, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(970, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(971, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(972, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(973, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(974, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(975, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(976, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(977, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(978, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(979, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(980, 37, '2_0', 'Tenali', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:06:30', '2025-08-18 11:06:30'),
(981, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Not Present', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(982, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(983, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(984, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(985, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(986, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(987, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(988, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(989, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(990, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(991, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(992, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(993, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(994, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(995, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(996, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(997, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(998, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(999, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1000, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1001, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1002, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1003, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1004, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1005, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1006, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1007, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1008, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:33:20', '2025-08-18 11:33:20'),
(1009, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1010, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1011, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1012, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1013, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1014, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1015, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1016, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1017, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1018, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1019, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1020, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1021, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1022, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1023, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1024, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1025, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1026, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1027, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1028, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1029, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:33:21', '2025-08-18 11:33:21'),
(1030, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Not Present', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1031, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15');
INSERT INTO `verify_serial_numbers_of_equipment_as_per_ic` (`id`, `station_id`, `section_id`, `station_name`, `railway_zone`, `division`, `initial_date`, `updated_date`, `observation_text`, `remarks`, `s_no`, `observation_status`, `image_paths`, `created_at`, `updated_at`) VALUES
(1032, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1033, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1034, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1035, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1036, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1037, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1038, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1039, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1040, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1041, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1042, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1043, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1044, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1045, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1046, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:34:15', '2025-08-18 11:34:15'),
(1047, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1048, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1049, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1050, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1051, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1052, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1053, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1054, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1055, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1056, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1057, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1058, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1059, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1060, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1061, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1062, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1063, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1064, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1065, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1066, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1067, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1068, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1069, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1070, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1071, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1072, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1073, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1074, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1075, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1076, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1077, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1078, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:34:16', '2025-08-18 11:34:16'),
(1079, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1080, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Not Installed', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1081, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1082, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1083, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1084, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1085, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1086, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1087, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1088, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1089, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1090, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1091, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1092, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1093, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1094, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1095, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1096, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1097, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1098, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1099, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1100, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1101, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1102, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1103, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1104, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1105, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1106, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1107, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1108, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:34:42', '2025-08-18 11:34:42'),
(1109, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1110, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1111, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1112, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1113, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1114, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1115, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1116, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1117, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1118, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1119, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1120, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1121, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1122, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1123, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1124, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1125, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1126, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1127, 38, '2_0', 'Repalle', 'CR', 'Nagpur', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:34:43', '2025-08-18 11:34:43'),
(1128, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Present', NULL, '2025-08-18 11:35:27', '2025-08-18 11:35:27'),
(1129, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 11:35:27', '2025-08-18 11:35:27'),
(1130, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:35:27', '2025-08-18 11:35:27'),
(1131, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:35:27', '2025-08-18 11:35:27'),
(1132, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1133, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1134, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1135, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1136, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1137, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1138, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1139, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1140, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1141, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1142, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1143, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1144, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1145, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1146, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1147, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1148, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1149, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1150, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1151, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1152, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1153, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1154, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1155, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1156, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1157, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1158, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1159, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1160, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1161, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1162, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1163, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:35:28', '2025-08-18 11:35:28'),
(1164, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1165, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1166, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1167, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1168, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1169, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1170, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1171, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1172, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1173, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1174, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1175, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1176, 38, '2_0', 'Repalle', 'CR', 'Mumbai', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:35:29', '2025-08-18 11:35:29'),
(1177, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Stationary TCAS unit', '', '2.1', 'Not Present', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1178, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 1', '', '2.2', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1179, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Peripheral Processing Card 2', '', '2.3', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1180, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 1', '', '2.4', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1181, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 2', '', '2.5', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1182, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Computer Card 3', '', '2.6', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1183, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Voter Card 1', '', '2.7', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1184, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Voter Card 2', '', '2.8', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1185, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Gateway Card 1', '', '2.9', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1186, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Vital Gateway Card 2', '', '2.10', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1187, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Integrated Data Logger Card (IDL)', '', '2.11', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1188, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Dual GSM Card', '', '2.12', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1189, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 1', '', '2.13', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1190, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 2', '', '2.14', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1191, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 3', '', '2.15', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1192, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 4', '', '2.16', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1193, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 5', '', '2.17', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1194, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 6', '', '2.18', 'Select', NULL, '2025-08-18 11:51:50', '2025-08-18 11:51:50'),
(1195, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 7', '', '2.19', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1196, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Field Scanner Card 8', '', '2.20', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1197, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'SMOCIP Unit', '', '2.21', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1198, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.22', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1199, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Next Gen/. Cal Amp Radio Modem', '', '2.23', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1200, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Station Radio Power Supply card-1', '', '2.24', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1201, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 1', '', '2.25', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1202, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'GPS &amp;amp; GSM Antenna 2', '', '2.26', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1203, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'DPS Card 1', '', '2.27', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1204, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'DPS Card 2', '', '2.28', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1205, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'EMI Filter 1', '', '2.29', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1206, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'EMI Filter 2', '', '2.30', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1207, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 1', '', '2.31', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1208, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 2', '', '2.32', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1209, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Media Converter 3', '', '2.33', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1210, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'Cable Extender', '', '2.34', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1211, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RIU-COM 1', '', '2.35', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1212, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RIU-COM 2', '', '2.36', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1213, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 1', '', '2.37', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1214, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 2', '', '2.38', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1215, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 3', '', '2.39', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1216, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 4', '', '2.40', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1217, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 5', '', '2.41', 'Select', NULL, '2025-08-18 11:51:51', '2025-08-18 11:51:51'),
(1218, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 6', '', '2.42', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1219, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 7', '', '2.43', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1220, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'FIU Termination Card 8', '', '2.44', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1221, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'PDU Box', '', '2.45', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1222, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RTU 1', '', '2.46', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1223, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RTU 2', '', '2.47', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1224, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RADIO 1', '', '2.48', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52'),
(1225, 38, '2_0', 'Repalle', 'ER', 'Howrah-COO', '2025-08-18', '2025-08-18', 'RADIO 2', '', '2.49', 'Select', NULL, '2025-08-18 11:51:52', '2025-08-18 11:51:52');

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
-- Indexes for table `relay_installation_and_wiring`
--
ALTER TABLE `relay_installation_and_wiring`
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
-- Indexes for table `rfid_tags`
--
ALTER TABLE `rfid_tags`
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
-- Indexes for table `station_tcas`
--
ALTER TABLE `station_tcas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_station_tcas_id` (`station_id`);

--
-- Indexes for table `tower_and_rtu`
--
ALTER TABLE `tower_and_rtu`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `loginpage`
--
ALTER TABLE `loginpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `relay_installation_and_wiring`
--
ALTER TABLE `relay_installation_and_wiring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `station_tcas`
--
ALTER TABLE `station_tcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tower_and_rtu`
--
ALTER TABLE `tower_and_rtu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `verify_serial_numbers_of_equipment_as_per_ic`
--
ALTER TABLE `verify_serial_numbers_of_equipment_as_per_ic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1226;

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
-- Constraints for table `relay_installation_and_wiring`
--
ALTER TABLE `relay_installation_and_wiring`
  ADD CONSTRAINT `fk_relay_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `report_versions`
--
ALTER TABLE `report_versions`
  ADD CONSTRAINT `fk_report_versions_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rfid_tags`
--
ALTER TABLE `rfid_tags`
  ADD CONSTRAINT `fk_rfid_tags_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `smocip`
--
ALTER TABLE `smocip`
  ADD CONSTRAINT `fk_smocip_station_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `station_tcas`
--
ALTER TABLE `station_tcas`
  ADD CONSTRAINT `fk_station_tcas_id` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tower_and_rtu`
--
ALTER TABLE `tower_and_rtu`
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
