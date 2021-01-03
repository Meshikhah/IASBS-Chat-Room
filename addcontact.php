<?php
session_start();
require_once "config.php";
require_once "model/user.php";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(isset($request) && isset($_SESSION['USER'])) {

    $u = unserialize($_SESSION['USER']);
    $contactClass = new contact($u->getUsername());
    $contactClass->addContact($request->user1);
}
?>