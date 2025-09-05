-- Create table for section 8.0: RFID PS Unit Observations
CREATE TABLE `rfid_ps_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
