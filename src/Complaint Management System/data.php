<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

$logs = [];
array_push($logs, "Server connected");
$data = [];
array_push($data, ["name" => "Christo"]);


$data = array(
    'data' => $data,
    "logs" => $logs
);



// Convert PHP data to JSON format
echo json_encode($data);
