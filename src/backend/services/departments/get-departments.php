<?php
require "../modules/connectDatabase.php";

echo "<h2>List Of Departments</h2>";

echo "<p>Connecting with Database";
$database = connectDB();
echo "<p>Connected with Database Successfully";

$departments = getDepartments($database);

function getDepartments($database)
{
    echo "<p>Fetching Departments from database";
    $query = "SELECT * FROM departments";
    try {
        $result = mysqli_query($database, $query);
        if (mysqli_num_rows($result) == 0) {
            echo "<p>No Departments Found.</p>";
        } else {
            $values = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $values[] = $row;
            }
            echo "<p>Departments fetched successfully</p>";

            for ($i = 0; $values[$i]; $i++) {
                $row = $values[$i];
                if($row["head"] == ""){
                    $row["head"] = "Empty Slot";
                }
                echo "
                        <div class='card departments'>
                        <p class='name'>$row[name]</p>
                        <p class='description'>$row[description]</p>
                        <p class='head'><b>HOD</b>: $row[head]</p>

                        <button onclick=window.location.href='../departments/edit-department.php'>Edit</button>
                        <button onclick=`window.location.href='../departments/delete-department.php'`>Delete</button>
                        </div>";

                
            }


        }
    } catch (\Throwable $err) {
        echo "<p>Error Fetching Departments from Database: $err</p>";
    }
}
?>