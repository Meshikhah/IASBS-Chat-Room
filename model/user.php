<?php

require_once "database.php";
require_once "config.php";
abstract class person
{
    public $name;
    public $family;
    public $email;

    function getName()
    {
        return $this->name;
    }

    function setName($name)
    {
        $this->name = $name;
    }

    function getFamily()
    {
        return $this->family;
    }

    function setFamily($family)
    {
        $this->family = $family;
    }

    function getEmail()
    {
        return $this->email;
    }

    function setEmail($email)
    {
        $this->email = $email;
    }

}

class user extends person
{
    private $username;
    private $password;

    function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    function getPassword()
    {
        return $this->password;
    }

    function setPassword($password)
    {
        $this->password = md5($password);
    }

    function checkUserPass()
    {
        $paramTypes = "ss";
        $Parameters = array($this->username, $this->password);
        $result = database::ExecuteQuery('checkUserPass', $paramTypes, $Parameters);

        if(mysqli_num_rows($result) > 0)
        {
            $row = $result->fetch_array();
            $this->setName($row["name"]);
            $this->setFamily($row["family"]);
            $this->setEmail($row["email"]);
            return true;
        }
        return false;
    }

    private function getUserAsaText()
    {
        return $this->username.' '.$this->password.' '.$this->name.' '.$this->family.' '.$this->email.PHP_EOL;
    }

    private function IsUsernameExist()
    {
        $paramTypes = "s";
        $Parameters = array($this->username);
        $result = database::ExecuteQuery('isUsernameExist', $paramTypes, $Parameters);

        if(mysqli_num_rows($result) > 0)
              return true;
        return false;
    }

    function Save()
    {
        if(!$this->IsUsernameExist()) {
            $paramTypes = "sssss";
            $Parameters = array($this->name, $this->family, $this->email, $this->username, $this->password);
            database::ExecuteQuery('addUser', $paramTypes, $Parameters);
            return true;
        }
        return false;
    }

    public static function GetAllUsers()
    {
        $result = database::ExecuteQuery('getAllUsers');
        $tempUser = "";
        while ($row = $result->fetch_array())
        {
            
            $tempUser .= ($row['username']). " ";
        }
        return $tempUser;
    }
    
    function profile($user) {
        $tempUser = "";
        $paramTypes = "s";
        $Parameters = array($user);
        $result = database::ExecuteQuery('profile', $paramTypes, $Parameters); 
        $row = $result->fetch_array();
        $tempUser .= "name:". ($row['name']). ",";
        $tempUser .= "family:". ($row['family']). ",";
        $tempUser .= "email:". ($row['email']). ",";
        $tempUser .= "username:".($row['username']). ",";
        return $tempUser;
    }

}

class message
{
    private $from_user;
    private $to_user;
    private $text_message;
    private $time_status;
    private $messageList;

    function __construct($username, $to) {
        $this->from_user = $username;
        $this->getMessageList($to);
    }

    function getFromUser()
    {
        return $this->from_user;
    }

    function getToUser()
    {
        return $this->to_user;
    }

    function getTextMessage()
    {
        return $this->text_message;
    }

    function getTimeStatus()
    {
        return $this->time_status;
    }

    function setMessage($input_message)
    {
        $this->text_message = $input_message;
    }

    function getMessageList($username) {
        // $this->messageList = array("from_user"=>array(), "message"=>array(), "date"=>array());
        $this->messageList = array();
        // $tempMessage = array("message"=>array(), "date"=>array());
        $paramTypes = "ss";
        $Parameters = array($this->from_user, $username);
        $result = database::ExecuteQuery('getMessageList', $paramTypes, $Parameters);
       
        
        while ($row = $result->fetch_array())
        {
            
            // $tempMessage = $row['message'];

            if($row["to_user"] == $username) 
                // array_push($this->messageList["from_user"], $username);
                array_push($this->messageList,["from_user"=>$username, "message" => $row["message"], "date"=> $row["time_status"] ]);
            else array_push($this->messageList, ["from_user" =>"" ,"message" => $row["message"], "date"=> $row["time_status"]]);

            // array_push($this->messageList["message"], $row["message"]);
            // array_push($this->messageList["date"], $row["time_status"]);
            // array_push($this->messageList, $tempMessage);
        }
        return $this->messageList;
    }

    function fetchMessagelist()
    {   
        $array = $this->messageList;
        foreach($array as $k =>$a){
            $array[$k] = (($a));
        }
        //print_r($array);
        return $array;
    }

    function sendMessage($username, $message) {
        $this->messageList = array();
        // $tempMessage = array("message"=>array(), "date"=>array());
        $paramTypes = "sss";
        $Parameters = array($this->from_user, $username, $message);
        $result = database::ExecuteQuery('sendMessage', $paramTypes, $Parameters);
        $this->getMessageList($username);
    }

    function deleteMessage($username, $date){

        $paramTypes = "sss";
        $Parameters = array($this->from_user, $username, $date);
        $result = database::ExecuteQuery('deleteMessage', $paramTypes, $Parameters);

        $this->getMessageList($username);
    }

    function editMessage($username, $date, $message){
        
        $paramTypes = "ssss";
        $Parameters = array($this->from_user, $username, $date, $message);
        $result = database::ExecuteQuery('editMessage', $paramTypes, $Parameters);

        $this->getMessageList($username);
    }
}


class contact
{
    
    private $username;
    private $contactList; // list

    function __construct($username) {
        $this->username = $username;
        $this->getContactList();
    }

    function setUsername($username) {
        $this->username = $username;
    }
    
    function getCountContactList() {
        return count($this->contactList);
    }

    function getlist() {
        return $this->contactList;
    }

    function addContact($user) {
        for($i = 0; $i < count($this->contactList); $i++) {
            if($this->contactList[$i] == $user) return;
        }
        $paramTypes = "ss";
        $Parameters = array($this->username, $user);
        database::ExecuteQuery('addContact', $paramTypes, $Parameters);
        $this->getContactList();
    }

    function isContact($user) {
        $paramTypes = "ss";
        $Parameters = array($this->username, $user);
        $result = database::ExecuteQuery('isContact', $paramTypes, $Parameters);
        if(mysqli_num_rows($result) > 0)
              return true;
        return false;
        
    }
    
    function getContactList() {
        $this->contactList = array();
        $paramTypes = "s";
        $Parameters = array($this->username);
        $result = database::ExecuteQuery('getContactList', $paramTypes, $Parameters);


        while ($row = $result->fetch_array())
        {
            $tempContact = "";
            if($row['user'] == $this->username)
                $tempContact = $row['contact'];
            else 
                $tempContact = $row['user'];

            array_push($this->contactList, $tempContact);
        }
        return $this->contactList;

    }

    public function jsonSerialize(){
        return get_object_vars($this);
    }

    function fetchContactlist()
    {
        $list =  array();
        for($i = 0; $i < count($this->contactList); $i++) {
            $list[$i] = $this->contactList[$i];
        }
        return $list;
    }

}

class blocked
{
    private $username;
    private $blockedList;

    function __construct($username)
    {
        $this->username = $username;
        $this->getBlockdList();
    }

    function setUsername($username)
    {
        $this->username = $username;
    }

    function addBlocked($user) {
        $paramTypes = "ss";
        $Parameters = array($this->username, $user);
        database::ExecuteQuery('addBlocked', $paramTypes, $Parameters);
        $this->getBlockdList();
    }

    function isBlocked($user)
    {
        $paramTypes = "ss";
        $Parameters = array($this->username, $user);
        $result = database::ExecuteQuery('isBlock', $paramTypes, $Parameters);
        if(mysqli_num_rows($result) > 0)
              return true;
        return false;
    }

    function getBlockdList()
    {
        $this-> blockedList = array();
        $paramTypes = "s";
        $Parameters = array($this->username);
        $result = database::ExecuteQuery('getBlockedList', $paramTypes, $Parameters);


        while ($row = $result->fetch_array())
        {
            $tempBlock = "";
            if($row['user'] == $this->username)
                $tempBlock = $row['block'];
            else 
                $tempBlock = $row['user'];

            array_push($this->blockedList, $tempBlock);
        }
        return $this->blockedList;

    }

    function fetachBlockedList(){
        $list =  array();
        for($i = 0; $i < count($this->blockedList); $i++) {
            $list[$i] = $this->blockedList[$i];
        }
        return $list;
    }

    function unBlock($user){
        $paramTypes = "ss";
        $Parameters = array($this->username, $user);
        $result = database::ExecuteQuery('unBlock', $paramTypes, $Parameters);
        $this->getBlockdList();
    }
}

?>