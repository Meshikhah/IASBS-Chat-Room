<?php
session_start();
require "model/user.php";
require_once "config.php";
if(!isset($_SESSION['USER'])) {
    header('Location: index.php');
}
else
{
    $u = unserialize($_SESSION['USER']);
    $contact_user = new contact($u->getUsername());
    $WelcomeMessage = 'Welcome '.$u->getName(). ' '.$u->getFamily().' '.PHP_EOL;
    echo $WelcomeMessage;
    // for ($i=0; $i < $contact_user->getContactList(); $i++)
    //     $WelcomeMessage .= $contact_user->getlist()[$i];
}

require "config.php";
// include $ShareFolderPath."header.html";
// include $ShareFolderPath."menu.html";

include $ViewPath."chat.html";

// include $ShareFolderPath."footer.html";



?>

