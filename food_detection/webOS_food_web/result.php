<?php
$data = file_get_contents("php://input");
header('Content-type:application/json;charset=utf-8');
echo json_encode($data);
?>