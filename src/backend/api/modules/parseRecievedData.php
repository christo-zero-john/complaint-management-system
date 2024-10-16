<?php

/**
 * @author Christo John.
 * @since 11-10-2024
 * @description Used to extract recieved data from the client side request.
 * @return array $recievedData - An array containing the recieved data from the client side.

 */
function parseRecievedData()
{
    try {
        $jsonData = file_get_contents('php://input');
        return json_decode($jsonData, true);
    } catch (\Throwable $error) {
        pushError($error);
    }
}
