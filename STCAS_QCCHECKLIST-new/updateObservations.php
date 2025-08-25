<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$tableNames = [
    'verify_serial_numbers_of_equipment_as_per_ic',
    'tower_and_rtu',
    'station_tcas',
    'relay_installation_and_wiring',
    'smocip',
    'rfid_tags'
];

$sectionIndex = $_POST['section_index'] ?? null;
if (!isset($tableNames[(int)$sectionIndex])) {
    echo json_encode(['success' => false, 'message' => 'Invalid or missing section index.']);
    exit;
}
$tableName = $tableNames[(int)$sectionIndex];

$stationId = $_POST['station-id'] ?? '';
$sectionId = $_POST['section-id'] ?? '';
$observationsJson = $_POST['observations'] ?? '';

if (empty($stationId) || empty($sectionId) || empty($observationsJson)) {
    echo json_encode(['success' => false, 'message' => 'Missing required data.']);
    exit;
}

$observations = json_decode($observationsJson, true);
if (!$observations || !is_array($observations)) {
    echo json_encode(['success' => false, 'message' => 'Invalid observations format.']);
    exit;
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=station_info;charset=utf8mb4", "root", "Hbl@1234", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed: ' . $e->getMessage()]);
    exit;
}

$debugInfo = []; // Array to hold debug information per observation.

try {
    $pdo->beginTransaction();

    foreach ($observations as $obs) {
        $s_no = $obs['S_no'];
        $remarks = $obs['remarks'] ?? '';
        $status = $obs['observation_status'] ?? '';
        // Get new barcode from the 'barcode' field sent from the client.
        $newBarcode = trim($obs['barcode'] ?? '');
        $image_paths = $obs['image_paths'] ?? []; // Get image paths from the observation

        // Get existing observation_text (which holds description and barcode) if any.
        $check = $pdo->prepare("SELECT observation_text FROM $tableName WHERE station_id = ? AND section_id = ? AND s_no = ?");
        $check->execute([$stationId, $sectionId, $s_no]);
        $existing = $check->fetch();

        $debugEntry = [
            'S_no' => $s_no,
            'newBarcode_input' => $newBarcode,
            'action' => '',
            'existing_observation_text' => ''
        ];

        if ($existing) {
            $existingText = trim($existing['observation_text']);
            $debugEntry['existing_observation_text'] = $existingText;

            // Assume the format is "Description: barcode"
            // Use regex to capture description and barcode.
            if (preg_match('/^(.*):\s*(\d{10,15})$/', $existingText, $matches)) {
                $existingDescription = trim($matches[1]);
                $existingBarcode = trim($matches[2]);
            } else {
                // If format is not as expected, assume entire text is description and no barcode exists.
                $existingDescription = $existingText;
                $existingBarcode = '';
            }

            // Preserve the existing barcode if no new barcode is entered.
            if (empty($newBarcode)) {
                $newBarcode = $existingBarcode;
            }
            
            $debugEntry['existingDescription'] = $existingDescription;
            $debugEntry['existingBarcode'] = $existingBarcode;
            $debugEntry['finalBarcode'] = $newBarcode;
           // Only append “: barcode” if there actually is a barcode
           if ($newBarcode !== '') {
             $observation_text = $existingDescription . ': ' . $newBarcode;
           } else {
            $observation_text = $existingDescription;
           }

            // Update record in database.
            $update = $pdo->prepare("
                UPDATE $tableName
                SET observation_text = ?, observation_status = ?, remarks = ?, updated_at = NOW()
                WHERE station_id = ? AND section_id = ? AND s_no = ?
            ");
            $update->execute([$observation_text, $status, $remarks, $stationId, $sectionId, $s_no]);

            $debugEntry['action'] = 'updated';
            
            // Handle image updates if provided.
            if (!empty($image_paths) && is_array($image_paths)) {
                // Delete existing images for this observation.
                $deleteStmt = $pdo->prepare("DELETE FROM images WHERE station_id = ? AND s_no = ?");
                $deleteStmt->execute([$stationId, $s_no]);

                // Insert the new images.
                foreach ($image_paths as $imgPath) {
                    $imgStmt = $pdo->prepare("INSERT INTO images (entity_type, station_id, s_no, image_path, created_at) VALUES (?, ?, ?, ?, NOW())");
                    $imgStmt->execute(['radio_power', $stationId, $s_no, $imgPath]);
                }
            }
        } else {
            // No existing record: Insert a new record.
            // In this case, if there is no description available, store the barcode as is.
            $insert = $pdo->prepare("
                INSERT INTO $tableName 
                    (station_id, section_id, s_no, observation_text, observation_status, remarks, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            $insert->execute([$stationId, $sectionId, $s_no, $newBarcode, $status, $remarks]);

            $debugEntry['action'] = 'inserted';
            $debugEntry['finalBarcode'] = $newBarcode;

            // Handle image inserts for new observations.
            if (!empty($image_paths) && is_array($image_paths)) {
                foreach ($image_paths as $imgPath) {
                    $imgStmt = $pdo->prepare("INSERT INTO images (entity_type, station_id, s_no, image_path, created_at) VALUES (?, ?, ?, ?, NOW())");
                    $imgStmt->execute(['radio_power', $stationId, $s_no, $imgPath]);
                }
            }
        }
        $debugInfo[] = $debugEntry;
    }
    
    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Observations and images updated successfully.', 'debug' => $debugInfo]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Error updating observations: ' . $e->getMessage()]);
}
?>
