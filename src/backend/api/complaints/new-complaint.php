<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require_once "../modules/connectDatabase.php";
require_once "../modules/pushError.php";
require_once "../modules/parseRecievedData.php";
require_once "../modules/pushLog.php";
require_once "../modules/assignments/assign-complaint.php";


/**
 * @var $response Stores a predefined template of the response that is to be returned to the client side.
 * @author `Christo John`.
 
 * @property  $response["status"] - Stores the status of request. The status could be either of `success`, `failed`, `error`,  `warning`,  `info`,  `not_found`,   `invalid_request`,  `invalid_credentials`,  `invalid_token`,  `invalid_data`,   `invalid_parameters`,  `invalid_method`,  `invalid_url`, or `invalid_request_method`. 
 * @property  $response["log"] - Stores an array of `logs`  that are to be returned to the client side. Each log is a `string` message that is suppossed to be printed in the  client side, or just for additional information.
 * @property  $response["errors"] -  Stores an array of `errors` that are to be returned to the client side. Each error is an assosciative array with an error `code` and error `message`.
 * @property  $response["returned"] - Store the actual data that is tobe send to the client side. It is the data after performing the `create-account` action. It contains  the `user_id` of the newly created user, along with a JWT token.




 */
$response = [
    "status" => "success",
    "logs" => [["recieved data" => parseRecievedData()]],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing Create New Complaint");
    $database = connectDB();
    $data = parseRecievedData();

    $title = mysqli_real_escape_string($database, $data["title"]);
    $description = mysqli_real_escape_string($database, $data["description"]);
    $category = mysqli_real_escape_string($database, $data["category"]);
    $department = mysqli_real_escape_string($database, $data["department"]);
    $is_private = mysqli_real_escape_string($database, $data["private"]);
    $created_by = mysqli_real_escape_string($database, $data["createdBy"]);
    $created_on = mysqli_real_escape_string($database, $data["created_on"]);
    $assignee = mysqli_real_escape_string($database, $data["assignee"]);

    $query = "INSERT INTO complaints(title, description, CiD, DiD, is_private, created_by_id, created_on) 
    VALUES ('$title',  '$description', '$category', '$department', '$is_private', '$created_by', '$created_on')";

    pushLog(
        "<div>
                <p>Creating New Complaint <b>$title</b> with 
                <b>Description</b>:   <i>$description</i>
                <b>Category ID</b>:   <i>$category</i>
                <b>Departent ID</b>:   <i>$department</i>
                <b>Visisbility</b>:   <i>$is_private</i>
                <b>User ID</b>:   <i>$created_by</i>
                <b>Create Date</b>:   <i>$created_on</i>
                </p>
                <p>And Empty parameters id, status, feedback and report</p>
            </div>"
    );

    mysqli_query($database, $query);
    pushLog("Complaint Created Successfully.");
    $complaint_id = mysqli_insert_id($database);
    pushLog($complaint_id);

    $assignmentData = [
        "complaint_id" => $complaint_id,
        "assigned_to" => $assignee,
        "assigned_by" => $created_by,
        "assigned_on" => $created_on,
    ];

    assignComplaint($assignmentData);


} catch (\Throwable $error) {
    pushError($error);
}

echo json_encode($response);
