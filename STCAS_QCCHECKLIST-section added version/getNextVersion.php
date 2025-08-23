<?php
header('Content-Type: application/json');

$servername = "localhost";
$username   = "root";
$password   = "Hbl@1234";
$dbname     = "station_info";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$stationId = isset($_GET['station_id']) ? trim($_GET['station_id']) : '';
if ($stationId === '') {
    echo json_encode(['success' => false, 'message' => 'station ID is required']);
    $conn->close();
    exit;
}

// Normalize to integer where possible
$stationIdInt = (int)$stationId;

// Fetch existing version
$sql  = "SELECT latest_version FROM report_versions WHERE station_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $stationIdInt);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nextVersion = ((int)$row['latest_version']) + 1;

    $updateSql  = "UPDATE report_versions SET latest_version = ? WHERE station_id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("ii", $nextVersion, $stationIdInt);
    $updateStmt->execute();
    $updateStmt->close();
} else {
    $nextVersion = 1;
    $insertSql  = "INSERT INTO report_versions (station_id, latest_version) VALUES (?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("ii", $stationIdInt, $nextVersion);
    $insertStmt->execute();
    $insertStmt->close();
}

$stmt->close();
echo json_encode(['success' => true, 'version' => $nextVersion]);
$conn->close();
?>
