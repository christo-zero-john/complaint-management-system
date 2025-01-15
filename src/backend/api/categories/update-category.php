<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";


$response = [
    "status" => "success",
    "logs" => [],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing Update Category");
    $database = connectDB();
    $data = parseRecievedData();

    $name = $data["name"];
    $description = $data["description"];
    $id = $data["id"];


    $query = "UPDATE categories 
    SET
        name = '$name',
        description = '$description'
    WHERE id = '$id'"; 

    pushLog(
        "<div>
            <p>Updating Category  with <b>ID:</b> $id, with data <b>$name</b>, <b>Description</b>:   <i>$description</i>.</p>
        </div>"
    );
    mysqli_query($database, $query);
    pushLog("Category Updated Successfully.");
} catch (\Throwable $error) {
    pushError($error);
}


echo json_encode($response);
