<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";


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
    "logs" => [],
    "errors" => [],
    "returned" => [],
];


try {
    pushLog("Initializing get all Roles");
    $database = connectDB();
    pushLog("Connected with Database Successfully");

    $roles = fetchRoles();
} catch (\Throwable $error) {
    pushError($error);
}

function fetchRoles()
{
    global $database;
    global $response;

    pushLog("Fetching roles from database");
    $query = "SELECT * FROM roles";
    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            throw new Error("No roles Found.");
        } else {
            $roles = [];
            while ($row = mysqli_fetch_assoc($result)) {
                // This condition is included because at some point when we add new data to the table an entry with no values except for auto incrementing ID column is added to the table. Its was a real bother which couldn't be fixed even after too much time of debugging.
                if ($row["name"] != "") {
                    array_push($roles, $row);
                } else {
                    pushLog("An entry with no data is found"); // This is a temporary fix. It should be removed once the issue is fixed.

                }
            }
            pushLog("roles fetched successfully");
            $response["returned"] = $roles;
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}


echo json_encode($response);
