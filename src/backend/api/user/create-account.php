<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require "../modules/connectDatabase.php";
require "../modules/pushError.php";
require "../modules/parseRecievedData.php";
require "../modules/pushLog.php";
require "../user-roles/set-user-role.php";
require_once "../user/delete-account.php";
require_once "../user-roles/get-user-roles.php";

/**
 * @var $response Stores a predefined template of the response that is to be returned to the client side.
 * @author `Christo John`.
 
 * @property  $response["status"] - Stores the status of request. The status could be either of `success`, `failed`, `error`,  `warning`,  `info`,  `not_found`,   `invalid_request`,  `invalid_credentials`,  `invalid_token`,  `invalid_data`,   `invalid_parameters`,  `invalid_method`,  `invalid_url`, or `invalid_request_method`. 
 * @property  $response["log"] - Stores an array of `logs`  that are to be returned to the client side. Each log is a `string` message that is suppossed to be printed in the  client side, or just for additional information.
 * @property  $response["errors"] -  Stores an array of `errors` that are to be returned to the client side. Each error is an assosciative array with an error `code` and error `message`.
 * @property  $response["returned"] - Store the actual data that is tobe send to the client side. It is the data after performing the `create-account` action. It contains  the `user_id` of the newly created user, along with a JWT token.




 */
$response = [
    "status" => "success",
    "logs" => [],
    "errors" => [],
    "returned" => [],
];

// Main Logic for creating new user account.
try {
    $data = parseRecievedData();
    $database = connectDB();
    $name = $data["name"];
    $email = $data["email"];
    $password = $data["password"];
    $user_role = $data["role"];

    if (createAccount()) {
        setUserRole($email, $user_role);
        setUserRole($email, "Admin");
        $user_roles = fetchUserRoles($email);
        // pushLog($user_roles);

        $response["returned"] = [
            "id" => $email,
            "roles" => $user_roles
        ];
    }

} catch (\Throwable $error) {
    pushError($error);
}

function createAccount()
{
    global $database;
    global $data;

    global $email;
    global $password;
    global $name;

    global $response;

    if (accountExistsForEmail($data["email"])) {
        throw new Error("Email already exists");
    } else {
        pushLog(" Creating new account in the system ");
        $name = $data["name"];
        $password = $data["password"];
        $id = $email;
        $created_on = "2024-10-07";
        $JWTtoken = "";
        $signupQuery = "INSERT INTO users(name, email, password, created_on, id) VALUES('$name', '$email', '$password', '$created_on', '$id')";
        pushLog("Running Signup query.");
        $request = mysqli_query($database, $signupQuery);

        if ($request) {
            pushLog("Successfully Created user account.");
            return 1;
        } else {
            throw new Error("Unexpected Error encountered when tried creating new user account: " + mysqli_error($database));
        }
    }
}

function accountExistsForEmail($email)
{
    global $response;
    global $database;
    $query = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($database, $query);
    pushLog("Checking if mail id already exists");
    if (mysqli_num_rows($result) > 0) {
        pushLog("Email Found. Aborting Create New user account");
        return 1;
    } else {
        pushLog("Email Not Found. Creating New user account");
        return 0;
    }
}

/**
 * Returns the `$response` as a json encoded data to the client side.
 */
echo json_encode($response);
