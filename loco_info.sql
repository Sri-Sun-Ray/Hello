CREATE DATABASE  IF NOT EXISTS `loco_info` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `loco_info`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: loco_info
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dmi_lp_ocip`
--

DROP TABLE IF EXISTS `dmi_lp_ocip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dmi_lp_ocip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `document_verification_table`
--

DROP TABLE IF EXISTS `document_verification_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_verification_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int DEFAULT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `image_path` varchar(1000) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_loco_id` (`loco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `earthing`
--

DROP TABLE IF EXISTS `earthing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `earthing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emi_filter_box`
--

DROP TABLE IF EXISTS `emi_filter_box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emi_filter_box` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entity_type` varchar(100) NOT NULL,
  `s_no` varchar(50) NOT NULL,
  `loco_id` varchar(50) DEFAULT NULL,
  `image_path` varchar(5000) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `iru_faviely_units_fixing_for_e70_type_loco`
--

DROP TABLE IF EXISTS `iru_faviely_units_fixing_for_e70_type_loco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iru_faviely_units_fixing_for_e70_type_loco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loco`
--

DROP TABLE IF EXISTS `loco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loco` (
  `Loco_Id` int NOT NULL,
  `Loco_type` varchar(255) NOT NULL,
  `Brake_type` varchar(255) NOT NULL,
  `Railway_Division` varchar(255) NOT NULL,
  `Shed_name` varchar(255) NOT NULL,
  `inspection_Date` date NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Loco_Id` (`Loco_Id`),
  UNIQUE KEY `unique_loco_combo` (`Loco_Id`,`Railway_Division`,`Shed_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loco_antenna_and_gps_gsm_antenna`
--

DROP TABLE IF EXISTS `loco_antenna_and_gps_gsm_antenna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loco_antenna_and_gps_gsm_antenna` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loco_kavach`
--

DROP TABLE IF EXISTS `loco_kavach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loco_kavach` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loginpage`
--

DROP TABLE IF EXISTS `loginpage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loginpage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pgs_and_speedo_meter_units_fixing`
--

DROP TABLE IF EXISTS `pgs_and_speedo_meter_units_fixing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pgs_and_speedo_meter_units_fixing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pneumatic_fittings_and_ep_valve_cocks_fixing`
--

DROP TABLE IF EXISTS `pneumatic_fittings_and_ep_valve_cocks_fixing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pneumatic_fittings_and_ep_valve_cocks_fixing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pressure_sensors_installation_in_loco`
--

DROP TABLE IF EXISTS `pressure_sensors_installation_in_loco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pressure_sensors_installation_in_loco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `psjb_tpm_units_fixing_for_ccb_type_loco`
--

DROP TABLE IF EXISTS `psjb_tpm_units_fixing_for_ccb_type_loco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psjb_tpm_units_fixing_for_ccb_type_loco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `radio_power`
--

DROP TABLE IF EXISTS `radio_power`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `radio_power` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rfid_ps_unit`
--

DROP TABLE IF EXISTS `rfid_ps_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rfid_ps_unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rfid_reader_assembly`
--

DROP TABLE IF EXISTS `rfid_reader_assembly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rfid_reader_assembly` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rib_cab_input_box`
--

DROP TABLE IF EXISTS `rib_cab_input_box`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rib_cab_input_box` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sifa_valve_fixing_for_ccb_type_loco`
--

DROP TABLE IF EXISTS `sifa_valve_fixing_for_ccb_type_loco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sifa_valve_fixing_for_ccb_type_loco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` text NOT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verify_serial_numbers_of_equipment_as_per_ic`
--

DROP TABLE IF EXISTS `verify_serial_numbers_of_equipment_as_per_ic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verify_serial_numbers_of_equipment_as_per_ic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loco_id` int NOT NULL,
  `section_id` varchar(50) NOT NULL,
  `loco_type` varchar(50) NOT NULL,
  `brake_type` varchar(50) NOT NULL,
  `railway_division` varchar(100) NOT NULL,
  `shed_name` varchar(100) NOT NULL,
  `inspection_date` date NOT NULL,
  `observation_text` varchar(255) DEFAULT NULL,
  `remarks` text NOT NULL,
  `S_no` varchar(50) NOT NULL,
  `observation_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_loco_id` (`loco_id`),
  CONSTRAINT `fk_loco_id` FOREIGN KEY (`loco_id`) REFERENCES `loco` (`Loco_Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'loco_info'
--

--
-- Dumping routines for database 'loco_info'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-09 10:59:39
