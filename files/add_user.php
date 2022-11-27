<?php
include_once "./account_class.php";
$db = new Database();
if($db->find_value($_POST['login'],"login")) //check if login already exists in database
    echo json_encode(array('result' => "1"));
else
{
    if($db->find_value($_POST['email'],"email")) //check if email already exists in database
        echo json_encode(array('result' => "2"));
    else
    {
        echo json_encode(array('result' => "3"));
        $db->create_line($_POST["name"],$_POST["login"],$_POST["email"],$_POST["password"]);
    }
}
?>