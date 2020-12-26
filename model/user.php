<?php

require_once "database.php";
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
}

class message
{
    private $from_user;
    private $to_user;
    private $text_message;
    private $time_status;

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


}

class blocked
{
    private $username;
    private $blockedList;

    function setUsername($username)
    {
        $this->username = $username;
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
}

?>