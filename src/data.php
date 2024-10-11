<?php
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

$data = array(
    'username' => 'JohnDoe',
    'email' => 'johndoe@example.com'
);

// Convert PHP data to JSON format
echo json_encode($data);
?>