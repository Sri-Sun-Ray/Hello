<?php
$servername = "localhost"; // or your server IP
$username = "root"; // your MySQL username
$password = "Hbl@1234"; // your MySQL password
$dbname = "station_info"; // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$stationId = isset($_GET['station_id']) ? $_GET['station_id'] : '';

if (empty($stationId)) {
    echo json_encode(['success' => false, 'message' => 'station ID is required']);
    exit;
}

// Step 1: Check if locoId exists
$sql = "SELECT latest_version FROM report_versions WHERE station_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $locoId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Loco exists → Increment version
    $row = $result->fetch_assoc();
    $nextVersion = $row['latest_version'] + 1;

    // Update latest version
    $updateSql = "UPDATE report_versions SET latest_version = ? WHERE station_id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("is", $nextVersion, $locoId);
    $updateStmt->execute();
} else {
    // New loco → Insert first version 1
    $nextVersion = 1;
    $insertSql = "INSERT INTO report_versions (loco_id, latest_version) VALUES (?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("si", $locoId, $nextVersion);
    $insertStmt->execute();
}

echo json_encode(['success' => true, 'version' => $nextVersion]);

$conn->close();
?>
