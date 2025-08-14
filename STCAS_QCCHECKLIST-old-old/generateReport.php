<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['station-id'], $_POST['division'], $_POST['zone'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing necessary POST data']);
    exit;
}

$stationID = htmlspecialchars($_POST['station-id']);
$division = htmlspecialchars($_POST['division']);
$zone = htmlspecialchars($_POST['zone']);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=station_info', 'root', 'Hbl@1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Fetch loco details
    $stationQuery = "SELECT station_id, station_name, railway_zone, division, initial_date, updated_date
                  FROM station
                  WHERE station_id = ? AND railway_zone = ? AND division = ?";
    $stationStmt = $pdo->prepare($stationQuery);
    $stationStmt->execute([$stationID, $division, $zone]);
    $stationDetails = $stationStmt->fetch();

    if (!$stationDetails) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Loco details not found.']);
        exit;
    }

    $tableNames = [
        'verify_serial_numbers_of_equipment_as_per_ic',
        'loco_kavach', 'emi_filter_box', 'rib_cab_input_box', 'dmi_lp_ocip',
        'rfid_ps_unit'
    ];

    $observations = [];

    // Fetch all images for this loco
    $imageQuery = "SELECT S_no, image_path FROM images WHERE station_id = ?";
    $imageStmt = $pdo->prepare($imageQuery);
    $imageStmt->execute([$stationID]);
    $allImages = $imageStmt->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_COLUMN);

    // Go through each observation table
    foreach ($tableNames as $tableName) {
        $query = "SELECT S_no, observation_text, remarks, observation_status, section_id
                  FROM $tableName
                  WHERE station_id = ? AND railway_zone = ? AND division = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$stationID, $division, $zone]);
        $tableObservations = $stmt->fetchAll();

        foreach ($tableObservations as &$obs) {
            $imagesForThisSno = $allImages[$obs['S_no']] ?? [];

            $validImages = [];
            foreach ($imagesForThisSno as $imagePath) {
                if (file_exists(__DIR__ . '/' . $imagePath) && strpos($imagePath, 'uploads/') === 0) {
                    $validImages[] = "http://localhost/STCAS_QCCHECKLIST/" . $imagePath;
                }
            }

            $obs['images'] = $validImages;
        }

        $observations = array_merge($observations, $tableObservations);
    }

    echo json_encode([
        'success' => true,
        'stationDetails' => $stationDetails,
        'observations' => $observations
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
