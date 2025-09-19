<?php
$uploadDir = 'uploads/files';  // correct folder path

// Create folder if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (isset($_FILES['supportingFile'])) {
    $file = $_FILES['supportingFile'];
    $uploadPath = $uploadDir . basename($file['name']);

    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        echo "<p>✅ File uploaded successfully: <a href='$uploadPath' target='_blank'>$file[name]</a></p>";
    } else {
        echo "<p>❌ Error uploading file.</p>";
    }
} else {
    echo "<p>⚠️ No file uploaded.</p>";
}
?>
