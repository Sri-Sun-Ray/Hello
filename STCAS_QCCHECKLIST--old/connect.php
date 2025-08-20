<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

date_default_timezone_set("Asia/Kolkata");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = new mysqli('localhost', 'root', 'Hbl@1234', 'station_info');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => '❌ DB connection failed']);
        exit;
    }

    $stationId = trim($_POST['station-id'] ?? '');
    $stationName = trim($_POST['station-name'] ?? '');
    $zone = trim($_POST['zone'] ?? '');
    $division = trim($_POST['division'] ?? '');
    $initialDate = trim($_POST['initial-date'] ?? '');
    $updatedDate = trim($_POST['updated-date'] ?? '');

    if (!$stationId || !$stationName || !$zone || !$division || !$initialDate || !$updatedDate) {
        echo json_encode(['success' => false, 'message' => '❌ All fields are required']);
        exit;
    }

    $currentTime = date("Y-m-d H:i:s");

    $check = $conn->prepare("SELECT 1 FROM station WHERE station_id = ?");
    $check->bind_param("i", $stationId);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'ℹ️ Station already exists. Start time preserved.']);
    } else {
        $insert = $conn->prepare("INSERT INTO station 
            (station_id, station_name, railway_zone, division, initial_date, updated_date, start_time, completed_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $insert->bind_param("isssssss", $stationId, $stationName, $zone, $division, $initialDate, $updatedDate, $currentTime, $currentTime);
        if ($insert->execute()) {
            echo json_encode(['success' => true, 'message' => '✅ Station info saved with start time']);
        } else {
            echo json_encode(['success' => false, 'message' => '❌ Insert failed: ' . $insert->error]);
        }
        $insert->close();
    }

    $check->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => '❌ Only POST allowed']);
}
?>