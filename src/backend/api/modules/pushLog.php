<?php

/**
 * Pushes log/messages to the `$response["logs"]` array.
 * @global $response . The `$response` global varibale is accessed from within the function.
 * @param $err . A copy of `$error` object of `Throwable` class should be sent as  second argument.

 */
function pushLog($msg)
{
    global $response;
    array_push($response["logs"], $msg);
}
