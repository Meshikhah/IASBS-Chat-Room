<?php
session_start();
require_once "config.php";
require_once "model/user.php";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo $request->user1;
$u = unserialize($_SESSION['USER']);
$messageClass = new message($u->getUsername(), $request->user1);

$list = $messageClass->fetchMessagelist();

echo json_encode($list);
// echo $_REQUEST['un'];
// if(isset($_REQUEST['un']) && isset($_SESSION['USER'])) {

//     $messageClass = new message($u->getUsername(), $_REQUEST['un']);
//     echo $_REQUEST['un'];
// }
