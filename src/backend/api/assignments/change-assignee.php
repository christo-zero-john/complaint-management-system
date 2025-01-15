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
    pushLog("Initializing Change Assignee for Complaint");
    $database = connectDB();
    $data = parseRecievedData();

    $complaint_id = $data["complaint_id"];
    $assignee = $data["assignee_id"];
    $assigned_on = date("Y-m-d H:i:s");

    $query = "UPDATE assignments 
              SET assigned_to = '$assignee', assigned_on = '$assigned_on'
              WHERE complaint_id = '$complaint_id'";

    pushLog("Updating assignee for complaint with ID: $complaint_id to assignee: $assignee");

    mysqli_query($database, $query);
    pushLog("Assignee Updated Successfully.");
} catch (\Throwable $error) {
    pushError($error);
}

echo json_encode($response);
?>