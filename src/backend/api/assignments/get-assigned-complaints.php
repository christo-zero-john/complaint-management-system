<?php

header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";
require_once "../modules/complaints/get-complaint-by-id.php";


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
    $data = parseRecievedData();
    $user_id = $data["user_id"];

    $complaint_ids = [];
    $user_roles = fetchUserRoles($user_id);
    foreach ($user_roles as $role_id) {
        $complaint_ids = array_merge($complaint_ids, getComplaintsByRole($role_id));
        pushLog($complaint_ids);
    }

    $complaints = [];
    foreach ($complaint_ids as $complaint_id) {
        $complaints = array_merge($complaints, fetchComplaintById($complaint_id));
    }
    $response["returned"] = $complaints;

} catch (\Throwable $error) {
    pushError($error);
}

echo json_encode($response);

function fetchUserRoles($UiD)
{
    global $response;

    pushLog("Initializing get user Roles");
    $database = connectDB();
    pushLog("Connected with Database Successfully");
    pushLog("Fetching user roles from database");
    $query = "SELECT * FROM user_roles WHERE UiD = '$UiD'";
    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            pushLog("No user roles Found");
            throw new Exception("No user roles Found.");
        } else {
            $userRoles = [];
            while ($row = mysqli_fetch_assoc($result)) {
                // This condition is included because at some point when we add new data to the table an entry with no values except for auto incrementing ID column is added to the table. Its was a real bother which couldn't be fixed even after too much time of debugging.
                if ($row["RiD"] != "") {
                    array_push($userRoles, $row["RiD"]);
                } else {
                    pushLog("An entry with no data is found"); // This is a temporary fix. It should be removed once the issue is fixed.

                }
            }
            pushLog("user roles ID's fetched successfully");
            return $userRoles;
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}

function getComplaintsByRole($RiD)
{
    pushLog("Fetching Complaints with role ID: $RiD");
    global $database;
    $complaints = [];
    $query = "SELECT * FROM assignments WHERE assigned_to = $RiD";
    $result = mysqli_query($database, $query);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($complaints, $row["complaint_id"]);
        }
        pushLog($complaints);
        return $complaints;
    } else {
        pushLog("No Complaint assigned to role $RiD");
        return [];
    }
}



/** How to Get Assigned Complaints of user
 * Fetch all roles of user ✅
 * For each role of user get all complaint ID's assigned to that role ✅
 * Fetch all complaints with those complaint ID's 
 * Push all complaints into an array ✅
 * return the array to client
 */