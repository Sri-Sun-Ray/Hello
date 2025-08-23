<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "Hbl@1234", "station_info");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "❌ DB connection failed"]);
    exit;
}

$stationID = trim($_GET['station_id'] ?? '');
if (!$stationID) {
    echo json_encode(["success" => false, "message" => "❌ Missing station_id"]);
    exit;
}

$sql = "SELECT start_time, completed_time FROM station WHERE station_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $stationID);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "start_time" => $row["start_time"],
        "completed_time" => $row["completed_time"]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "❌ station ID not found"]);
}

$stmt->close();
$conn->close();
?>
