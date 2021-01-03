<?php
session_start();
require_once "config.php";
require_once "model/user.php";

if(isset($_SESSION['USER'])) {
    $usersList = user::GetAllUsers();
    echo json_encode($usersList);
}

?>