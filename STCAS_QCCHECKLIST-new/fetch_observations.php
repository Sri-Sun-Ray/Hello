<?php
session_start();

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "Hbl@1234";
$dbname = "station_info";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'DB connection failed: ' . $conn->connect_error]);
    exit;
}

if (!isset($_GET['station_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing station_id']);
    exit;
}

$stationId = $conn->real_escape_string($_GET['station_id']);

$tableNames = [
    "verify_serial_numbers_of_equipment_as_per_ic", "tower_and_rtu",
    "station_tcas", "relay_installation_and_wiring", "smocip", "rfid_tags",
    
];

$observations = [];

foreach ($tableNames as $tableName) {
    $sql = "SELECT S_no, observation_text, observation_status, remarks, created_at, updated_at FROM $tableName WHERE station_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $stationId);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $s_no = $row['S_no'];

        // Fetch associated images from `images` table for each S_no
        $imgStmt = $conn->prepare("SELECT image_path FROM images WHERE station_id = ? AND s_no = ?");
        $imgStmt->bind_param("ss", $stationId, $s_no);
        $imgStmt->execute();
        $imgResult = $imgStmt->get_result();

        $imagePaths = [];
        while ($imgRow = $imgResult->fetch_assoc()) {
            $imagePaths[] = $imgRow['image_path'];
        }

       $observations[] = [
    'S_no' => $row['S_no'],
    'observation_text' => $row['observation_text'],
    'observation_status' => $row['observation_status'],
    'remarks' => $row['remarks'],
    'image_paths' => $imagePaths,
    'created_at' => $row['created_at'],
    'updated_at' => $row['updated_at']
];

    }
}

if (!empty($observations)) {
    echo json_encode(['status' => 'success', 'data' => $observations]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No observations found']);
}

$conn->close();
?>
