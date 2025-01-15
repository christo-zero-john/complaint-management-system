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
    "logs" => [parseRecievedData()],
    "errors" => [],
    "returned" => [],
];

try {
    pushLog("Initializing get all Complaints");
    $database = connectDB();
    pushLog("Connected with Database Successfully");
    $data = parseRecievedData();

    $total_complaints = 0;
    $resolved_complaints = 0;
    $rejected_complaints = 0;
    $closed_complaints = 0;
    $total_roles = 0;
    $total_users = 0;
    $total_categories = 0;
    $total_reviewers = 0;
    $total_departments = 0;


    pushLog("Fetching all Complaints");
    $complaints = fetchComplaints();
    pushLog("Complaints fetched successfully");
    pushLog("Start counting complaints");
    foreach ($complaints as $complaint) {
        $total_complaints++;
        if ($complaint["status"] == 2) {
            $resolved_complaints++;
        }
        if ($complaint["status"] == 3) {
            $rejected_complaints++;
        }
        if ($complaint["status"] == 4) {
            $closed_complaints++;
        }
    }

    pushLog("Fetching and counting all Roles");

    $query = "SELECT COUNT(*) FROM roles";
    $result = mysqli_query($database, $query);
    $total_roles = mysqli_fetch_assoc($result)["COUNT(*)"];

    pushLog("Fetching and counting all Categories");

    $query = "SELECT COUNT(*) FROM categories";
    $result = mysqli_query($database, $query);
    $total_categories = mysqli_fetch_assoc($result)["COUNT(*)"];

    pushLog("Fetching and counting all Users");

    $query = "SELECT COUNT(*) FROM users";
    $result = mysqli_query($database, $query);
    $total_users = mysqli_fetch_assoc($result)["COUNT(*)"];

    pushLog("Fetching and counting all Departments");

    $query = "SELECT COUNT(*) FROM departments";
    $result = mysqli_query($database, $query);
    $total_departments = mysqli_fetch_assoc($result)["COUNT(*)"];

    pushLog("Fetching and counting all Reviewers");

    $query = "SELECT COUNT(DISTINCT  UiD) as reviewers_count FROM user_roles";
    $result = mysqli_query($database, $query);
    $row = mysqli_fetch_assoc($result);
    $total_reviewers = $row['reviewers_count'];


    $response["returned"] = [
        "total-complaints" => $total_complaints,
        "total-rejected-complaints" => $rejected_complaints,
        "total-resolved-complaints" => $resolved_complaints,
        "total-closed-complaints" => $closed_complaints,
        "total-roles" => $total_roles,
        "total-categories" => $total_categories,
        "total-users" => $total_users,
        "total-reviewers" => $total_reviewers,
        "total-departments" => $total_departments,
    ];
} catch (\Throwable $error) {
    pushError($error);
}

function fetchComplaints()
{
    global $database;
    global $response;
    global $user_id;

    pushLog("Fetching complaints from database");
    $query = "SELECT * FROM complaints";
    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            return [];
        } else {
            $complaints = [];
            while ($row = mysqli_fetch_assoc($result)) {
                // This condition is included because at some point when we add new data to the table an entry with no values except for auto incrementing ID column is added to the table. Its was a real bother which couldn't be fixed even after too much time of debugging.
                if ($row["title"] != "") {
                    array_push($complaints, $row);
                } else {
                    pushLog("An entry with no data is found"); // This is a temporary fix. It should be removed once the issue is fixed.

                }
            }
            pushLog("Complaints fetched successfully");
            return $complaints;
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}



echo json_encode($response);
