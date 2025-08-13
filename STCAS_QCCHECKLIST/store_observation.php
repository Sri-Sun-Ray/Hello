<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Log POST data to check what is being received (only for debugging purposes)
    file_put_contents('php://stderr', "POST data: " . print_r($_POST, true) . "\n");

    // Check if all necessary data is available
    if (isset($_POST['station-id'], $_POST['section-id'], $_POST['observations'], $_POST['station-name'], $_POST['zone'], $_POST['division'])) {

        // Sanitize input data to prevent XSS and ensure security
        $stationID = htmlspecialchars($_POST['station-id']);
        $sectionID = htmlspecialchars($_POST['section-id']);
        $stationName = htmlspecialchars($_POST['station-name']);
        $zone = htmlspecialchars($_POST['zone']);
        $division = htmlspecialchars($_POST['division']);
        $observations = json_decode($_POST['observations'], true);
        

        // Check if JSON is valid
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['success' => false, 'message' => 'Error: Invalid JSON format for observations.']);
            exit;
        }

        // Check if there are any observations to save
        if (empty($observations)) {
            echo json_encode(['success' => false, 'message' => 'Error: No observations to save.']);
            exit;
        }

        // Process the observations and insert them into the database
        try {
            // Database connection using PDO
            $pdo = new PDO('mysql:host=localhost;dbname=station_info', 'root', 'Hbl@1234'); // Update with your DB credentials
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable error handling for PDO

            // Check if loco_id and section_id combination already exists
            $checkQuery = "SELECT COUNT(*) FROM observations WHERE station_id = ? AND section_id = ?";
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([$locoID, $sectionID]);
            $exists = $checkStmt->fetchColumn();

            if ($exists > 0) {
                // If the combination exists, return a validation error
                echo json_encode(['success' => false, 'message' => 'Details already filled for this station ID and section.']);
                exit;
            }

            // SQL query to insert observation data
            $sql = "INSERT INTO observations (station_id, section_id, station_name, railway_zone, division,observation_text, remarks, S_no, image_path, observation_status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);

            // Loop through each observation and execute the insert
            foreach ($observations as $observation) {
                $observationText = htmlspecialchars($observation['observation_text']);
                $remarks = isset($observation['remarks']) ? htmlspecialchars($observation['remarks']) : '';
                $imagePath = null; // Default in case there's no image

                // Check if an image is provided either as a file or base64
                if (isset($_FILES['image'])) {
                    // Process file upload (from form input - device upload) 
                    $uploadDir = 'uploads/';
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                
                    $response = ["success" => false, "message" => "No file provided"];
                
                    // Handle uploaded files
                    if (isset($_FILES['image'])) {
                        $file = $_FILES['image'];
                        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
                        $uniqueFileName = 'file-' . uniqid() . '.' . $fileExtension; // Generate unique file name
                        $targetFilePath = $uploadDir . $uniqueFileName;
                
                        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
                            $response = [
                                "success" => true,
                                "message" => "File uploaded successfully",
                                "file_path" => $targetFilePath
                            ];
                        } else {
                            $response["message"] = "Failed to upload file";
                        }
                    }
                
                    echo json_encode($response);
                }  

                // Store the serial number (S_no) and observation status
                $sno = htmlspecialchars($observation['S_no']);  // Store the S_no value

                // Handle observation status
                $observationStatus = strtolower(trim($observation['observation_status']));

                // If status is 'please choose an option', skip this observation
                if ($observationStatus === 'please choose an option') {
                    continue; // Skip the insert for this observation
                }

                // Convert status values to upper case as per your requirement
                if ($observationStatus === 'ok') {
                    $observationStatus = 'Available';
                } elseif ($observationStatus === 'not-ok') {
                    $observationStatus = 'NOT Available';
                } else {
                    // Invalid status, return error
                    echo json_encode(['success' => false, 'message' => 'Error: Invalid observation status.']);
                    exit;
                }

                // Insert observation into the database
                $stmt->execute([
                    $stationID,
                    $sectionID,
                    $stationName,
                    $zone,
                    $division,
                    $observationText,
                    $remarks,
                    $sno,
                    $imagePath,
                    $observationStatus
                ]);
            }

            // If everything is successful, return success response
            echo json_encode(['success' => true, 'message' => 'Observations saved successfully.']);
        } catch (PDOException $e) {
            // Log and return a more generic error message for security
            file_put_contents('php://stderr', 'Database error: ' . $e->getMessage() . "\n"); // Log error for debugging
            echo json_encode(['success' => false, 'message' => 'Error saving observations.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing necessary POST data']);
    }
}



