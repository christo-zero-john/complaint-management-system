<?php
require "../system/connectDatabase.php";

$database = connectDB();

echo "<h3>Create New Department</h3>";
if ($_GET) {
    echo "<p>Data Received: </p>";
} else {
    echo "<p>No Data Recieved</p>";
    exit;
}

createNewDepartment($database);

function createNewDepartment($database)
{

    $receivedData = $_GET;
    $name = $receivedData["name"];
    $description = $receivedData["description"];
    $id = "";
    $head = "";

    $query = "INSERT INTO departments(name, description) VALUES  ('$name', '$description')";
    try {
        echo "
    <div>
        <p>Creating New Department <b>$name</b> with <b>Description</b>:   <i>$description</i></p>
        <p>And Empty parameters id and department</p>
    </div>";
        mysqli_query($database, $query);
        echo "<p>Department Created Successfully.</p>";
    } catch (\Throwable $th) {
        echo "<p>Error Creating new department.</p><p>$th</p>";
    }
}
?>