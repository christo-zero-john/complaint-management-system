<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";
require_once "./set-user-role.php";


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
    $role_id = $data["role_id"];
    $user_id = $data["user_id"];

    if (!checkAlreadyAssigned($role_id, $user_id)) {
        setRole($user_id, $role_id);
    } else {
        pushLog("User with $user_id already has role $role_id");
        throw new Error("Role Already Assigned");
    }
} catch (\Throwable $error) {
    pushError($error);
}

/**
 * Returns the `$response` as a json encoded data to the client side.
 */
echo json_encode($response);


function checkAlreadyAssigned($role_id, $user_id)
{
    global $database;
    $query = "SELECT * FROM user_roles WHERE UiD = '$user_id' AND RiD = '$role_id'";
    $result = mysqli_query($database, $query);

    if (mysqli_num_rows($result) > 0) {
        return true;// Role already assigned
    } else {
        return false;// Role not assigned to user
    }

}