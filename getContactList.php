<?php
session_start();
require_once "config.php";
require_once "model/user.php";

if(isset($_SESSION['USER'])) {
    $u = unserialize($_SESSION['USER']);
    $userContacts = new contact($u->getUsername());
   
    echo json_encode($userContacts->fetchContactlist());
}