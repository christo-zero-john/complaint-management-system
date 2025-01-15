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
    "logs" => [["recieved data" => parseRecievedData()]],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing Create New Department");
    $database = connectDB();
    $data = parseRecievedData();

    $name = $data["name"];
    $description = $data["description"];

    if (departmentExists($name)) {
        throw new Error("Department Already Exists");
    } else {
        $query = "INSERT INTO departments(name, description) VALUES  ('$name', '$description')";
        pushLog(
            "<div>
                <p>Creating New Department <b>$name</b> with <b>Description</b>:   <i>$description</i></p>
                <p>And Empty parameters id and department head</p>
            </div>"
        );
        mysqli_query($database, $query);
        pushLog("Department Created Successfully.");
    }
} catch (\Throwable $error) {
    pushError($error);
}


function departmentExists($name)
{
    global $database;

    $query = "SELECT * FROM departments WHERE name='$name'";
    $result = mysqli_query($database, $query);
    pushLog("Checking if departent already exists");
    if (mysqli_num_rows($result) > 0) {
        pushLog("Departent already exists");
        return 1;
    } else {
        pushLog("Departent does not exists");
        return 0;
    }
}

echo json_encode($response);
