<?php
require_once "config.php";
require_once "model/user.php";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

echo $request ? "true":"false";
if(isset($_REQUEST['un_to'])) {

    //$u = unserialize($_SESSION['USER']);
    //$messageClass = new message($u->getUsername(), $request->user);
    echo $_REQUEST['un_to'];
}
?>