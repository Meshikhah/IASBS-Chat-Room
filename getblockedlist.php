<?php
session_start();
require_once "config.php";
require_once "model/user.php";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($request) && isset($_SESSION['USER'])) {
    
    $u = unserialize($_SESSION['USER']);
    $blockedClass = new blocked($u->getUsername(), $request->user1);
    $blockedClass->deleteMessage($request->user1, $request->date);

}
