<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Validate we have a 'loco_id' parameter
if (!isset($_GET['station_id']) || empty($_GET['station_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing station_id parameter.'
    ]);
    exit;
}

$stationId = $_GET['station_id'];

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=localhost;dbname=station_info;charset=utf8mb4", "root", "Hbl@1234", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Fetch the locomotive details from the 'loco' table using loco_id
    $stmt = $pdo->prepare("
        SELECT station_id, station_name, railway_zone, division, initial_date, updated_date 
        FROM station
        WHERE station_Id = :stationId
    ");
    $stmt->execute([':stationId' => $stationId]);
    $stationDetails = $stmt->fetch();

    if (!$stationDetails) {
        echo json_encode([
            'success' => false,
            'message' => "No station details found for station_id: $stationId"
        ]);
        exit;
    }

    // Transform the keys into a more JavaScript-friendly format
    $transformed = [
        'stationID'          => $stationDetails['station_Id'],
        'stationName'        => $locoDetails['station_Name'],
        'zone'       => $locoDetails['zone'],
        'division' => $locoDetails['division'],
        'initialDate'        => $locoDetails['initial_date'],
        'UpdatedDate'  => $locoDetails['updated_date']
    ];

    // Return the JSON response
    echo json_encode([
        'success' => true,
        'data' => [
            'stationDetails' => $transformed
        ]
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
