<?php

// Obtiene la información de un pos existente en base a su external_id

header('Content-type: application/json');

include_once '../../global/functions.php';
global $access_token;	

 // REVISA AQUÍ:
 // Qué método y endpoint de la API de Mercado Pago deberías poner aquí para poder   
 // crear un POS/QR?
 // Sustituye el método por su correspondiente: get, put, post, delete


$external_id = $_REQUEST["external_id"];
$url="https://api.mercadopago.com/pos";


curl_call("GET","$url?external_id=$external_id&access_token=$access_token","");

?>
