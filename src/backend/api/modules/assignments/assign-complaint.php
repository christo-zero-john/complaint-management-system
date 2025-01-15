<?php
function assignComplaint($data)
{
    global $database;
    $complaint_id = $data["complaint_id"];
    $assigned_to = $data["assigned_to"];
    $assigned_by = $data["assigned_by"];
    $assigned_on = $data["assigned_on"];
    pushLog($data);

    $query = "INSERT INTO assignments (complaint_id, assigned_to, assigned_by, assigned_on) VALUES ('$complaint_id', '$assigned_to', '$assigned_by', '$assigned_on')";

    pushLog("Creating new assignment");
    $result = mysqli_query($database, $query);
}

