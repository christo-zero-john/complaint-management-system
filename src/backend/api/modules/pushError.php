<?php

/**
 * Pushes error to the `$response["errors"]` array.
 * @global $response . The `$response` global varibale is accessed  from within the function.
 * @param $err . A copy of `$error` object of `Throwable` class should be sent as  second argument.

 */
function pushError($err)
{
    global $response;
    $response["status"] = "error";
    array_push(
        $response["errors"],
        [
            "code" => $err->getCode(),
            "message" => $err->getMessage(),
            "details" => $err->__toString()

        ]
    );
}
