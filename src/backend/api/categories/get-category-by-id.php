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
 * @property  $response["returned"] - Store the actual data that is tobe send to the client side. It is the data after performing the `create-account` action. It contains  the `category_id` of the newly created category, along with a JWT token.
 */

$response = [
    "status" => "success",
    "logs" => [parseRecievedData()],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing get Category By Id");
    $database = connectDB();
    pushLog("Connected with Database Successfully");

    fetchCategory();
} catch (\Throwable $error) {
    pushError($error);
}

function fetchCategory()
{

    global $database;
    global $response;

    $data = parseRecievedData();
    $CiD = $data["id"];
    pushLog($CiD);

    pushLog("Fetching Categories from database");
    $query = "SELECT * FROM categories";

    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            throw new Error("No Categories Found.");
        } else {
            $category = [];
            while ($row = mysqli_fetch_assoc($result)) {
                if ($row["id"] == $CiD) {
                    $category = [
                        "name" => $row["name"],
                        "id" => $row["id"],
                        "description" => $row["description"],
                    ];
                    break;
                }
            }
            if ($category["id"] == $CiD) {
                pushLog("Category fetched successfully");
                $response["returned"] = $category;
            } else {
                throw new Error("Category Not Found");
            }
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}

echo json_encode($response);
