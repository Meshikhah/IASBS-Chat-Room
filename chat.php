<?php
session_start();
require "model/user.php";
if(!isset($_SESSION['USER'])) {
    header('Location: index.php');
}
else
{
    $u = unserialize($_SESSION['USER']);
    
    $WelcomeMessage = 'Welcome '.$u->getName(). ' '.$u->getFamily();
}

require "config.php";
// include $ShareFolderPath."header.html";
// include $ShareFolderPath."menu.html";

include $ViewPath."chat.html";

// include $ShareFolderPath."footer.html";



?>

