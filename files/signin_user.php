<?php
include_once "./account_class.php";
$db = new Database();
if(!$db->is_available($_POST['login']))
    echo json_encode(array('result' => "1"));
else
{
    if(!$db->check_password($_POST["login"], $_POST["password"]))
        echo json_encode(array('result' => "2"));
    else
    {
        session_start();
        $_SESSION["login"]=$_POST["login"];
        echo json_encode(array('result' => "3"));
    }
}
?>