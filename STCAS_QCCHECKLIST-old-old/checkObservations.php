<?php
header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";
$username = "root"; 
$password = "Hbl@1234";
$dbname = "station_info";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    // Return error if connection fails
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get JSON input from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Debugging: Log received data for further analysis
file_put_contents("debug_log.txt", "Received Data: " . print_r($data, true) . "\n", FILE_APPEND);

// Check if all required parameters are present in the received data
if (!isset($data["stationId"], $data["zone"], $data["division"], $data["sectionId"])) {
    // Return error if any required parameter is missing
    echo json_encode([
        "error" => "Missing required parameters",
        "received" => $data
    ]);
    exit;
}

$stationId = $data["stationId"];
$zone = $data["zone"];
$division = $data["division"];
$sectionId = (int) $data["sectionId"]; // Ensure the sectionId is treated as an integer

// Debugging: Log the received section ID
file_put_contents("debug_log.txt", "Received Section ID: $sectionId\n", FILE_APPEND);

// Define table names associated with each section ID
$tableNames = [
    2 => 'verify_serial_numbers_of_equipment_as_per_ic',
    3 => 'loco_kavach',
    4 => 'emi_filter_box',
    5 => 'rib_cab_input_box',
    6 => 'dmi_lp_ocip',
    7 => 'rfid_ps_unit',
];

// Check if the provided section ID is valid
if (!isset($tableNames[$sectionId])) {
    // Return error if section ID is invalid
    echo json_encode([
        "error" => "Invalid section ID",
        "valid_sections" => array_keys($tableNames)
    ]);
    exit;
}

$table = $tableNames[$sectionId];

// Prepare SQL query to check if observations exist in the table
$checkQuery = "SELECT COUNT(*) as count FROM $table WHERE station_id = ? AND railway_zone = ? AND division = ?";
$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param("sss", $stationId, $zone, $division);
$checkStmt->execute();

// Fetch result and determine if any observations exist
$row = $checkStmt->get_result()->fetch_assoc();
$exists = $row["count"] > 0;

// Return response as JSON, indicating whether the section is filled or empty
echo json_encode([
    "exists" => $exists,
    "sectionId" => $sectionId,
    "message" => $exists ? "Section is filled" : "Section is empty"
]);

// Close the database connection
$conn->close();
?>
