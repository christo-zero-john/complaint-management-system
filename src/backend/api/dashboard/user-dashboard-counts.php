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
    $user_id = "";

    $total_complaints = 0;
    $resolved_complaints = 0;
    $rejected_complaints = 0;
    $closed_complaints = 0;

    if (key_exists('user_id', $data)) {
        $user_id = $data["user_id"];
    }

    if ($user_id != "") {
        pushLog("Fetching Complaints posted by user");
        $complaints = fetchMyComplaints();
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

        $response["returned"] = [
            "total_complaints" => $total_complaints,
            "rejected_complaints" => $rejected_complaints,
            "resolved_complaints" => $resolved_complaints,
            "closed_complaints" => $closed_complaints,
        ];
    } else {
        throw new Error("User ID not caught");
    }
} catch (\Throwable $error) {
    pushError($error);
}

function fetchMyComplaints()
{
    global $database;
    global $response;
    global $user_id;

    pushLog("Fetching complaints from database");
    $query = "SELECT * FROM complaints WHERE created_by_id = '$user_id'";
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
