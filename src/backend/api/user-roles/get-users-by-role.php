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

// Main Logic for creating new user account.
try {
    $data = parseRecievedData();
    $database = connectDB();
    $role_id = $data["role_id"];

    $query = "SELECT * FROM user_roles WHERE RiD = '$role_id'";
    $result = mysqli_query($database, $query);
    $userIds = [];
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($userIds, $row["UiD"]);
        }
    }
    if (count($userIds) > 0) {
        $response["returned"] = fetchUserNames($userIds);
    }

} catch (\Throwable $error) {
    pushError($error);
}

/**
 * Returns the `$response` as a json encoded data to the client side.
 */
echo json_encode($response);

function fetchUserNames($userIDs)
{
    $userNames = [];
    foreach ($userIDs as $id) {
        array_push($userNames, fetchUserName($id));
    }
    pushLog($userNames);
    return $userNames;
}

function fetchUserName($id)
{
    global $database;

    pushLog("Fetching User Name for user with id $id from database");
    $name = "";
    $query = "SELECT  * FROM users WHERE id = '$id'";
    $result = mysqli_query($database, $query);

    if (mysqli_num_rows($result) == 0) {
        pushLog("User with this id does not exists");
        throw new Exception("User with this id does not exists");
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row["name"] != "") {
                return [
                    "name" => $row["name"],
                    "id" => $row["id"],
                ];
            }
        }
    }
}

/**
 * How to fetch users by user id.
 * Fetch all users with user from user_users.
 * Extract user ID's data returned.
 * Store user ID's as an array.
 * Fetch user name for each user ID.
 * return Array of user names with user ID.
 */
