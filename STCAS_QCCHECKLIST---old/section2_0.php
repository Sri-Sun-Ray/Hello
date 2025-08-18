<?php
header("Content-Type: application/json");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Debug: log received POST data
        file_put_contents("debug_post.txt", print_r($_POST, true));

        if (
            isset($_POST['station-id'], $_POST['section-id'], $_POST['observations'],
                  $_POST['station-name'], $_POST['zone'],
                  $_POST['division'], $_POST['initial-date'], $_POST['updated-date'])
        ) {
            // Database connection
            $pdo = new PDO('mysql:host=localhost;dbname=station_info', 'root', 'Hbl@1234');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Fetch form data
            $stationCode = $_POST['station-id']; // This is the external station code
            $sectionID = $_POST['section-id'];
            $stationName = $_POST['station-name'];
            $zone = $_POST['zone'];
            $division = $_POST['division'];
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
            $stationIdQuery->execute([$stationCode]);
            $stationRow = $stationIdQuery->fetch(PDO::FETCH_ASSOC);

            if (!$stationRow) {
                echo json_encode(['success' => false, 'message' => 'Station not found in database']);
                exit;
            }
            $internalStationId = $stationRow['id'];

            // Prepare SQL statement
            $sql = "INSERT INTO verify_serial_numbers_of_equipment_as_per_ic (
                station_id, station_name, railway_zone, division, initial_date,
                updated_date, observation_text, remarks, S_no,
                observation_status, section_id, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            
            $stmt = $pdo->prepare($sql);

            // Loop through each observation
            foreach ($observations as $obs) {
                $imagePath = isset($obs['image_path']) ? htmlspecialchars($obs['image_path']) : null;

                $stmt->execute([
                    $internalStationId, $stationName, $zone, $division, $initialDate, $updatedDate,
                    htmlspecialchars($obs['observation_text']),
                    htmlspecialchars($obs['remarks']),
                    htmlspecialchars($obs['S_no']),
                    htmlspecialchars($obs['observation_status']),
                    $sectionID
                ]);

                // Update images in the images table:
                if (!empty($obs['image_paths']) && is_array($obs['image_paths'])) {
                    $deleteStmt = $pdo->prepare("DELETE FROM images WHERE station_id = ? AND s_no = ?");
                    $deleteStmt->execute([$internalStationId, $obs['S_no']]);

                    foreach ($obs['image_paths'] as $imgPath) {
                        $imgStmt = $pdo->prepare("INSERT INTO images (entity_type, station_id, s_no, image_path, created_at) VALUES (?, ?, ?, ?, NOW())");
                        $imgStmt->execute(['radio_power', $internalStationId, $obs['S_no'], $imgPath]);
                    }
                }
            }

            echo json_encode(['success' => true, 'message' => 'Observations saved successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing fields']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}
?>