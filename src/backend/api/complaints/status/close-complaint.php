<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../../modules/connectDatabase.php";
require "../../modules/pushError.php";
require "../../modules/parseRecievedData.php";
require "../../modules/pushLog.php";


$response = [
    "status" => "success",
    "logs" => [],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing Close complaint");
    $database = connectDB();
    $data = parseRecievedData();

    $id = $data["id"];
    pushLog($data);

    $query = "UPDATE complaints 
    SET status = 4
    WHERE id = $id";

    pushLog(
        "Closing complaint  with <b>ID:</b> $id."
    );

    mysqli_query($database, $query);
    pushLog("Complaint Closed Successfully.");
} catch (\Throwable $error) {
    pushError($error);
}

echo json_encode($response);
