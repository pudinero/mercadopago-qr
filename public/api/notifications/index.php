<?php

ini_set('display_errors', 0);
header('Content-type: application/json');
include_once '../global/functions.php';
global $access_token,$collector_id,$notificationJSON;


// Este servicio recibe notificaciones enviadas por Mercado Pago
// Mediante php://input
// Interpreta solamente las IPN buscando que lleguen los campos
// resource y topic en el body.
// Como no trabajaremos con Base de Datos, ésta es una forma creativa de recibir las notificaciones y guardar la última en un archivo de texto para poder hacer las consultas.

$rootPath = $_SERVER['DOCUMENT_ROOT'];


// Recibe notificación:
$received_json = str_replace(",}","}",file_get_contents('php://input'));
$received_json = str_replace(",\n}","}",$received_json);

$notification = json_decode($received_json,true);

$n=0;

if(isset($notification['resource'])){$resource = $notification['resource'];$n=$n+1;}else{$resource= "";}
if(isset($notification['topic'])){$topic =$notification['topic'];$n=$n+1;}else{$topic ="";}




if($n==2){
	// ***********************************************
	// GUARDAR LOS LA NOTIFICACIÓN EN ARCHIVO DE TEXTO
	// ***********************************************

	// retorna http 200 conforme recibió bien la notificación:
	header("HTTP/1.1 200 OK");


	// Guarda el campo resource de la notificación recibida:
	// seguramente deberás dar derechos al archivo notifications.txt
	// Por ejemplo con el comando: "sudo chmod 777 notifications.txt"

	$fp = fopen('notifications.txt', 'w');
	fwrite($fp, $resource);
	fclose($fp);

	echo $resource;


}else{
	
	// Si llegase otro tipo de notificación igual responderá http 200 pero no hará nada.

	header("HTTP/1.1 200 OK");

}
