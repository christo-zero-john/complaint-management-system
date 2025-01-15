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
    $is_admin = key_exists("is_admin", $data) && $data["is_admin"] || null;

    if ($is_admin) {
        $complaints = fetchAllComplaints();
        pushLog("Request from an admin user. Returning all complaints");
    } else {
        $complaints = fetchPublicComplaints();
        pushLog("Not an admin user. Only returning private complaints");
    }
} catch (\Throwable $error) {
    pushError($error);
}

function fetchAllComplaints()
{
    global $database;
    global $response;

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
            $response["returned"] = $complaints;
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}


function fetchPublicComplaints()
{
    global $database;
    global $response;

    pushLog("Fetching complaints from database");
    $query = "SELECT * FROM complaints WHERE is_private = 0";
    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            throw new Error("No complaints Found.");
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
            $response["returned"] = $complaints;
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}


echo json_encode($response);
