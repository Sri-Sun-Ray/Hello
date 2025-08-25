<?php
// Make sure this file is named 'generateReport.php' and is located at c:\xampp\htdocs\STCAS_QCCHECKLIST\

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['station-id'], $_POST['division'], $_POST['zone'],$_POST['section-name'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing necessary POST data']);
    exit;
}

$stationID = htmlspecialchars($_POST['station-id']);
$division = htmlspecialchars($_POST['division']);
$zone = htmlspecialchars($_POST['zone']);
$sectionName=htmlspecialchars($_POST['section-name']);


try {
    $pdo = new PDO('mysql:host=localhost;dbname=station_info', 'root', 'Hbl@1234', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Fetch station details
    $stationQuery = "SELECT station_id, station_name, railway_zone, division, section_name, initial_date, updated_date
                  FROM station
                  WHERE station_id = ? AND railway_zone = ? AND division = ? AND section_name=? ";
    $stationStmt = $pdo->prepare($stationQuery);
    $stationStmt->execute([$stationID, $zone, $division,$sectionName]);
    $stationDetails = $stationStmt->fetch();

    if (!$stationDetails) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Station details not found.']);
        exit;
    }

    $tableNames = [
        'verify_serial_numbers_of_equipment_as_per_ic',
        'tower_and_rtu', 'station_tcas', 'relay_installation_and_wiring', 'smocip',
        'rfid_tags'
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
                  WHERE station_id = ? AND railway_zone = ? AND division = ? AND section_name=?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$stationID, $zone, $division,$sectionName]);
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
