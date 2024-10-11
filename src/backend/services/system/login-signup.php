<?php
require "../modules/connectDatabase.php";

echo "Server Handle";
$submitedData = $_GET;
print_r($submitedData);

// Connect with database
$database = connectDB();
if ($database->connect_errno) {
    echo "Failed to connect to MySQL: " . $database->connect_error;
} else {
    echo "Successfully connected with database";
}

// Handle submited data
switch ($submitedData["ctx"]) {
    case "login": {
        echo "<p>Logging into the system</p>";
        login($submitedData, $database);
        break;
    }
    case "signup": {
        echo "<p>Starting to create new account in the system</p>";
        signup($submitedData, $database);
        break;
    }

}


function login($data, $database)
{
    $email = $data["email"];
    $password = $data["password"];
    echo "Logging user in with email: $email  password: $password";
    $query = "SELECT * FROM users WHERE email='$email' && password='$password'";
    $result = mysqli_query($database, $query);
    if (mysqli_num_rows($result) > 0) {
        echo "<p>User found Logged IN successfully.</p>";
    } else {
        $validateMailQuery = "SELECT * FROM users WHERE email='$email'";
        $mailResult = mysqli_query($database, $validateMailQuery);

        if (mysqli_num_rows($mailResult) == 0) {
            echo "<p>Email not found </p>";
        } else {
            echo "<p>Incorrect Password </p>";
        }

    }
}

function signup($data, $database)
{
    $email = $data["email"];
    $query = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($database, $query);
    echo "<p>Checking if mail id already exists</p>";
    if (mysqli_num_rows($result) > 0) {
        echo "<p>Email Already Exists... Please Login using Mail id and password</p>";
    } else {
        echo "<p>Creating new account in the system</p>";
        $name = $data["name"];
        $password = $data["password"];
        $id = $email;
        $created_on = "2024-10-07";
        $JWTtoken = "";
        $signupQuery = "INSERT INTO users VALUES('$name', '$email', '$password', '$created_on', '$id', '$JWTtoken')";
        echo "<p>Running query:<p>$signupQuery</p></p>";
        $request = mysqli_query($database, $signupQuery);
        print $request;
        if ($request) {
            echo "<p>Successfully Created user account</p>";
        } else {
            echo "<p>Error Creating User Account</p><p>" . mysqli_error($database) . "</p>";
        }
    }

}


?>