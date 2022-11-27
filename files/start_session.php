<?php 
    session_start();
    if(isset($_SESSION["login"]))
        echo json_encode(array('result' => $_SESSION["login"]));
    else
        echo json_encode(array('result' => "0"));
?>