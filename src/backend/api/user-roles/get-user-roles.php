<?php
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
            return fetchRoleNames($userRoles);
        }
    } catch (\Throwable $error) {
        pushError($error);
    }
}

function fetchRoleNames($roleIDs)
{
    $roleNames = [];
    foreach ($roleIDs as $id) {
        array_push($roleNames, fetchRoleName($id));
    }
    pushLog($roleNames);
    return $roleNames;
}

function fetchRoleName($id)
{
    global $database;

    pushLog("Fetching Role Name for role with id $id from database");
    $name = "";
    $query = "SELECT  * FROM roles WHERE id = '$id'";
    $result = mysqli_query($database, $query);

    if (mysqli_num_rows($result) == 0) {
        pushLog("Role with this id does not exists");
        throw new Exception("Role with this id does not exists");
    } else {
        $row = mysqli_fetch_assoc($result);
        $name = $row["name"];
        pushLog("Role name fetched successfully");
        return $name;
    }
}

/**
 * How to fetch user roles.
 * Fetch all roles of user from user_roles.
 * Extract roles ID's data returned.
 * Store role ID's as an array.
 * Fetch role name for each role ID.
 * return Array of role names.
 * 
 */
