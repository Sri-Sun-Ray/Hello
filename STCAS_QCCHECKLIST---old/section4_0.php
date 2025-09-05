<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (
            isset($_POST['station-id'], $_POST['section-id'], $_POST['observations'],
                  $_POST['station-name'], $_POST['zone'],
                  $_POST['division'], $_POST['section-name'], $_POST['initial-date'], $_POST['updated-date'])
        ) {
            // Database connection
            $pdo = new PDO('mysql:host=localhost;dbname=station_info', 'root', 'Hbl@1234');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Fetch form data
            $stationId = $_POST['station-id']; // External station code
            $sectionID = $_POST['section-id'];
            $stationName = $_POST['station-name'];
            $zone = $_POST['zone'];
            $division = $_POST['division'];
            $sectionName = $_POST['section-name'];
            $initialDate = $_POST['initial-date'];
            $updatedDate = $_POST['updated-date'];
            $observations = json_decode($_POST['observations'], true);

            // Validate observations data
            if (!$observations || !is_array($observations)) {
                echo json_encode(['success' => false, 'message' => 'Invalid observation data']);
                exit;
            }

            // Get the internal station.id for the given station_code
            $stationIdQuery = $pdo->prepare("SELECT id FROM station WHERE station_id = ?");
            $stationIdQuery->execute([$stationId]);
            $stationRow = $stationIdQuery->fetch(PDO::FETCH_ASSOC);

            if (!$stationRow) {
                echo json_encode(['success' => false, 'message' => 'Station not found in database']);
                exit;
            }
            $internalStationId = $stationRow['id'];

            // Loop through each observation
            foreach ($observations as $obs) {
                // Insert into station_tcas table
                $stmt = $pdo->prepare("INSERT INTO station_tcas (
                    station_id, station_name, railway_zone, division, section_name, initial_date,
                    updated_date, observation_text, remarks, S_no,
                    observation_status, section_id, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");

                $stmt->execute([
                    $stationId, $stationName, $zone, $division, $sectionName, $initialDate, $updatedDate,
                    htmlspecialchars($obs['observation_text']),
                    htmlspecialchars($obs['remarks']),
                    htmlspecialchars($obs['S_no']),
                    htmlspecialchars($obs['observation_status']),
                    $sectionID
                ]);

                // Update images in images table:
                if (!empty($obs['image_paths']) && is_array($obs['image_paths'])) {
                    $deleteStmt = $pdo->prepare("DELETE FROM images WHERE station_id = ? AND s_no = ?");
                    $deleteStmt->execute([$stationId, $obs['S_no']]);

                    foreach ($obs['image_paths'] as $imgPath) {
                        $imgStmt = $pdo->prepare("INSERT INTO images (entity_type, station_id, s_no, image_path, created_at) VALUES (?, ?, ?, ?, NOW())");
                        $imgStmt->execute(['radio_power', $stationId, $obs['S_no'], $imgPath]);
                    }
                }
            }

            echo json_encode(['success' => true, 'message' => 'Observations and images saved.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}