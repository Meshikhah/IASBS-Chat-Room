<?php 
session_start();
unset($_SESSION['USER']);
// session_destroy();

header('Location: chat.php');

?>