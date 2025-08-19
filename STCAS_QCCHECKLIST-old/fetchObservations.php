<?php
header('Content-Type: application/json');

if (isset($_GET['station_id'])) {
    $stationId = $_GET['station_id'];

    try {
        $pdo = new PDO("mysql:host=localhost;dbname=station_info", 'root', 'Hbl@1234');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $observations = [];

        // Loop through 17 tables and fetch observations for loco_id
        for ($i = 1; $i <= 17; $i++) {
            $tableName = "observations_section_$i";  // Example: observations_section_1, observations_section_2

            $stmt = $pdo->prepare("SELECT * FROM $tableName WHERE station_id = :station_id");
            $stmt->bindParam(':station_id', $locoId, PDO::PARAM_INT);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($data) {
                $observations = array_merge($observations, $data);
            }
        }

        if (!empty($observations)) {
            echo json_encode(['success' => true, 'observations' => $observations]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No observations found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>
