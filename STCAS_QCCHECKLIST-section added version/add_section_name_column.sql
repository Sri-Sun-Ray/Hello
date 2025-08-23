-- SQL script to add section_name column to existing tables
-- Run this script to update existing database tables

-- Add section_name column to station table
ALTER TABLE station ADD COLUMN section_name VARCHAR(255) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to verify_serial_numbers_of_equipment_as_per_ic table
ALTER TABLE verify_serial_numbers_of_equipment_as_per_ic ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to tower_and_rtu table
ALTER TABLE tower_and_rtu ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to station_tcas table
ALTER TABLE station_tcas ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to relay_installation_and_wiring table
ALTER TABLE relay_installation_and_wiring ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to smocip table
ALTER TABLE smocip ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to rfid_tags table
ALTER TABLE rfid_tags ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Add section_name column to observations table
ALTER TABLE observations ADD COLUMN section_name VARCHAR(100) NOT NULL DEFAULT '' AFTER division;

-- Update existing records to have a default section name if needed
-- You can modify the default value as needed
UPDATE station SET section_name = 'Default Section' WHERE section_name = '';
UPDATE verify_serial_numbers_of_equipment_as_per_ic SET section_name = 'Default Section' WHERE section_name = '';
UPDATE tower_and_rtu SET section_name = 'Default Section' WHERE section_name = '';
UPDATE station_tcas SET section_name = 'Default Section' WHERE section_name = '';
UPDATE relay_installation_and_wiring SET section_name = 'Default Section' WHERE section_name = '';
UPDATE smocip SET section_name = 'Default Section' WHERE section_name = '';
UPDATE rfid_tags SET section_name = 'Default Section' WHERE section_name = '';
UPDATE observations SET section_name = 'Default Section' WHERE section_name = '';
