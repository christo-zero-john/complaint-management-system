<?php
require_once "../modules/pushError.php";
require_once "../modules/pushLog.php";

/**
 * Sets Role for a user.
 * Accepts tow parameters.
 * @param userId User ID of the user who's role is to be set.
 * @param role The role to be set for the user.
 */
function setUserRole($userId, $roleName)
{
    try {
        $roleID = getRoleId($roleName);

        setRole($userId, $roleID);
    } catch (\Throwable $error) {
        throw new Error($error);
    }
}

function getRoleId($roleName)
{
    global $database;

    pushLog("Initialize Setting Role name");
    $query = "SELECT * FROM roles WHERE name='$roleName'";
    $result = mysqli_query($database, $query);
    if (mysqli_num_rows($result) == 0) {
        throw new Error("Role Name does not exist");
    } else if (mysqli_num_rows($result) > 1) {
        throw new Error("Multiple rows with same name found");
    } else {
        $role = mysqli_fetch_assoc($result);
        return $role['id'];
    }
}

function setRole($UiD, $RiD)
{
    global $database;
    pushLog(" Setting user role $RiD for user $UiD in the system");

    $query = "INSERT INTO user_roles(UiD, RiD) VALUES('$UiD', '$RiD')";
    pushLog(" Running Signup query.");
    $request = mysqli_query($database, $query);

    if ($request) {
        pushLog("Successfully Set New Role for user account.");
    } else {
        throw new Error("Unexpected Error encountered when tried setting new role for user account: " + mysqli_error($database));
    }
}

/**
 * How it Works
 * The Role name is a `String` which is same as  the name of the role in the database.
 * First `role id` of the `$role` is fetched from database.
 * A new row is added to the `userRoles` table with  the `user id` and the `role id`.
 */
