<?php

function fetchComplaintById($CiD)
{
    global $database;
    $query = "SELECT * FROM complaints WHERE id = $CiD";
    $result = mysqli_query($database, $query);
    $row = mysqli_fetch_assoc($result);
    return [$row];
}