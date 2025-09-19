<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if(isset($_POST['dbFile']))
{
    $dbfile='uploads/'.$_POST['dbFile'];
    $exportPath='../uploads/files/';

    if(!file_exists($dbfile))
    {
        die("Db file is not found");
    }

    if(!is_dir($exportPath)) mkdir($exportPath,0777,true);

    $db=new SQLite3($dbfile);

    $tablesResult = $db->query("SELECT name FROM sqlite_master WHERE type='table'");
    $spreadsheet = new Spreadsheet();

    $sheetIndex = 0;

    while($table=$tablesResult->fetchArray(SQLITE3_ASSOC)){
        $tableName=$table['name'];
        if($sheetIndex==0)
        {
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle($tableName);
        }
        else{
            $sheet = $spreadsheet->createSheet();
            $sheet->setTitle($tableName);
        }

        $rows = $db->query("SELECT * FROM $tableName");
        $rowIndex = 1;

        while($row = $rows->fetchArray(SQLITE3_ASSOC)){
            if($rowIndex == 1){
                // Header
                $sheet->fromArray(array_keys($row), NULL, 'A'.$rowIndex);
                $rowIndex++;
            }
            $sheet->fromArray(array_values($row), NULL, 'A'.$rowIndex);
            $rowIndex++;
        }
        $sheetIndex++;
    }

    $excelFile = $exportPath . pathinfo($dbfile, PATHINFO_FILENAME) . '.xlsx';
    $writer = new Xlsx($spreadsheet);
    $writer->save($excelFile);

    echo "Excel file created successfully: $excelFile";
}
else{
    echo "No Db file specified";
}
?>