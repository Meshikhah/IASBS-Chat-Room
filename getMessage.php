<?php
require_once "config.php";
require_once "model/user.php";

echo $_REQUEST['un'];
if(isset($_REQUEST['un'])) {

    //$u = unserialize($_SESSION['USER']);
    //$messageClass = new message($u->getUsername(), $_REQUEST['un']);
    echo $_REQUEST['un'];
}
?>