<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

// Ensure a file was uploaded
if(isset($_FILES['excelFile'])) {
    $file = $_FILES['excelFile']['tmp_name'];
    $spreadsheet = IOFactory::load($file);
    $worksheet = $spreadsheet->getActiveSheet();
    $tagIds = [];

    // Read header row
    $header = $worksheet->rangeToArray('A1:Z1', null, true, false)[0];
    $tagColIndex = array_search('Tag Id', $header);
    if($tagColIndex === false){
       echo json_encode(['error' => 'Tag Id column not found']);
       exit;
    }
    // Rows start at row 2
    $row = 2;
    while(($value = $worksheet->getCellByColumnAndRow($tagColIndex+1, $row)->getValue()) != '') {
       $tagIds[] = $value;
       $row++;
    }
    echo json_encode(['tagIds' => $tagIds]);
} else {
    echo json_encode(['error' => 'No file uploaded']);
}
?>
