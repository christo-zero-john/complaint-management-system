<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";
require_once "./get-user-roles.php";


$response = [
    "status" => "success",
    "logs" => [],
    "errors" => [],
    "returned" => [],
];

// Main Logic for creating new user account.
try {
    $data = parseRecievedData();
    $database = connectDB();
    $user_id = $data["user_id"];

    $response["returned"] = fetchUserRoles($user_id);

} catch (\Throwable $error) {
    pushError($error);
}

/**
 * Returns the `$response` as a json encoded data to the client side.
 */
echo json_encode($response);
