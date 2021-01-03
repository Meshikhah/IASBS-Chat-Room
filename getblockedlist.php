<?php
session_start();
require_once "config.php";
require_once "model/user.php";



if(isset($_SESSION['USER'])) {
    
    $u = unserialize($_SESSION['USER']);
    $blockedClass = new blocked($u->getUsername());
    $list = $blockedClass->fetachBlockedList();

    echo json_encode($list);

}