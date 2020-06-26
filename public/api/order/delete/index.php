<?php

// Borrar o cancelar una orden creada

header('Content-type: application/json');

include_once '../../global/functions.php';
global $access_token,$collector_id;

$external_id = $_REQUEST["external_id"];
 
 // REVISA AQUÍ:
 // Qué método y endpoint de la API de Mercado Pago deberías poner aquí para poder eliminar una orden
 // en base al external_id, collector_id recibidos
 // Pista... revísalo bien...
 // Sustituye el método por su correspondiente: get, put, post, delete

curl_call("MÉTODO","https://api.mercadolibre.com/mpmobile/instore/qr/$collector_id/$external_id?access_token=$access_token");

?>
