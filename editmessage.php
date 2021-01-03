<?php
session_start();
require_once "config.php";
require_once "model/user.php";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($request) && isset($_SESSION['USER'])) {
    
    $u = unserialize($_SESSION['USER']);
    $messageClass = new message($u->getUsername(), $request->user1);
    $messageClass->editMessage($request->user1, $request->date, $request->message);

}
?>
