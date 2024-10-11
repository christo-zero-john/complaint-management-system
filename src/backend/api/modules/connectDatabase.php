<?php
function connectDB()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "complaint management system";

    return new mysqli($servername, $username, $password, $database);
}
