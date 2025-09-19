<?php
if(isset($_FILES['dbFile'])){
    $targetDir="uploads/";
    if(!is_dir($targetDir)) mkdir($targetDir,0777,true);

    $fileName=basename($_FILES['dbFile']['name']);
    $targetFile=$targetDir.$fileName;

    if(move_uploaded_file($_FILES['dbFile']['tmp_name'],$targetFile)){
        echo "DB File uploaded succesfully: $fileName";
    }
    else {
        echo "Error Uploading DB File";
    }

}
else{
    echo "No File Uploaded";
}
?>