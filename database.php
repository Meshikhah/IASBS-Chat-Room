<?php
abstract class database
{
    private static function ConnectToDB()
    {
        global $server;
        global $db_username;
        global $db_password;
        global $db_name;

        $connection = mysqli_connect($server, $db_username, $db_password, $db_name);
        if ($connection->connect_error)
        {
            die("Connection failed: " . $connection->connect_error);
        }
        return $connection;
    }


    private static function PrepareParameters($ParamTypes, $Parameters)
    {
        $inputArray[] = &$ParamTypes;
        $j = count($Parameters);
        $ParameterQuestionMarks = "";
        for($i=0;$i<$j;$i++){
            $inputArray[] = &$Parameters[$i];
            $ParameterQuestionMarks.='?,';
        }

        return array("ParameterQuestionMarks"=>$ParameterQuestionMarks, "inputArray"=>$inputArray);
    }

    public static function ExecuteQuery($StoredProcedureName, $ParamTypes="", $Parameters=array())
    {
        $connection = database::ConnectToDB();

        $tempParameters = database::PrepareParameters($ParamTypes, $Parameters);
        $inputArray = $tempParameters["inputArray"];
        $ParameterQuestionMarks = $tempParameters["ParameterQuestionMarks"];

        $sql = "CALL ".$StoredProcedureName."(".substr($ParameterQuestionMarks, 0, -1).")";

        if($stmt = mysqli_prepare($connection, $sql))
        {
            if($ParamTypes != "")
                call_user_func_array(array($stmt, 'bind_param'), $inputArray);
            try {
                $stmt->execute();
                $result = $stmt->get_result();
                mysqli_stmt_close($stmt);
            }
            catch (Exception $err)
            {
                die($err->getMessage());
            }
        }
        else
            echo "Error!";

        $connection->close();
        return $result;
    }


}
?>