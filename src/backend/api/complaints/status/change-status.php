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
    pushLog("Initializing Change Complaint Status");
    $database = connectDB();
    $data = parseRecievedData();

    $id = $data["complaint_id"];
    $status = $data["status"];
    pushLog($data);

    $query = "UPDATE complaints 
    SET status = $status
    WHERE id = $id";

    pushLog(
        "Changing status of complaint  with <b>ID:</b> $id as $status"
    );

    mysqli_query($database, $query);
    pushLog("Complaint Status Changed Successfully.");
} catch (\Throwable $error) {
    pushError($error);
}

echo json_encode($response);
