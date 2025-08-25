<?php
header('Content-Type: application/json');

// Check if 'loco_id' is set in the query parameters
if (isset($_GET['station_id'])) {
    $stationId = $_GET['station_id'];  // Get the loco ID from URL

    try {
        // Database connection
        $pdo = new PDO("mysql:host=localhost;dbname=station_info", 'root', 'Hbl@1234');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Fetch the report using loco_id
        $stmtReport = $pdo->prepare("SELECT * FROM report WHERE station_id = :station_id");
        $stmtReport->bindParam(':station_id', $locoId, PDO::PARAM_INT);
        $stmtReport->execute();
        $report = $stmtReport->fetch(PDO::FETCH_ASSOC);

        if ($report) {
            // Array to hold all observations
            $observations = [];

            // Loop through all 17 tables to fetch observations related to loco_id
            for ($section = 1; $section <= 17; $section++) {
                $stmtObs = $pdo->prepare("SELECT * FROM section{$section}_observations WHERE station_id = :station_id");
                $stmtObs->bindParam(':station_id', $stationId, PDO::PARAM_INT);
                $stmtObs->execute();
                $sectionObservations = $stmtObs->fetchAll(PDO::FETCH_ASSOC);

                if ($sectionObservations) {
                    // Add observations from this section
                    $observations["section{$section}"] = $sectionObservations;
                }
            }

            // Attach the observations to the report
            $report['observations'] = $observations;

            echo json_encode(['success' => true, 'report' => $report]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Report not found for this station.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request. Station ID is required.']);
}
?>
