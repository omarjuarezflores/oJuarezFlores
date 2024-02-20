<?php
include_once "controlador/EmpleadoControlador.php";
include_once "controlador/UsuarioControlador.php";
$respuesta_back = array(
    'status' => false,
    'msg' => array()
);

$parametrosGet = $_GET;
//$parametrosPost = $_POST;
$parametrosPost = json_decode(file_get_contents('php://input'), true);

$rutas = new Rutas();

$pasa_url = true;

if(!isset($parametrosGet['peticion']) || $parametrosGet['peticion'] == ''){
    $pasa_url = false;
    $respuesta_back['msg'][] = 'Error, el campo GET - peticion es requerido';
}if(!isset($parametrosGet['funcion']) || $parametrosGet['funcion'] == ''){
    $pasa_url = false;
    $respuesta_back['msg'][] = 'Error, el campo GET - funcion es requerido';
}

if($pasa_url){
    //se recibio el parametro peticion y podemos avanzar
    switch ($parametrosGet['peticion']){ //es el que controla el grupo de peticiones

        case 'empleado':
            $empleadoControlador = new EmpleadoControlador();
            /**
             * preparar todas las funciones posibles del API rest: consultar registro, agregar registro, modificar y eliminar
             */
            switch ($parametrosGet['funcion']){
                case 'listado':
                    $respuestaEmpCtrl = $empleadoControlador->obtenerEmpleados();
                    $rutas->peticion($empleadoControlador->getCodigoRespuesta(),$respuestaEmpCtrl);
                    break;
                case 'nuevo':
                    $respuestaEmpCtrl = $empleadoControlador->insertarNuevo($parametrosPost);
                    $rutas->peticion($empleadoControlador->getCodigoRespuesta(),$respuestaEmpCtrl);
                    break;
               case 'actualizar':
                    $respuestaEmpCtrl = $empleadoControlador->actualizar($parametrosPost);
                    $rutas->peticion($empleadoControlador->getCodigoRespuesta(),$respuestaEmpCtrl);
                    break;
                case 'eliminar' :
                    $respuestaEmpCtrl = $empleadoControlador->eliminarEmpleado($parametrosPost);
                    $rutas->peticion($empleadoControlador->getCodigoRespuesta(),$respuestaEmpCtrl);

                    break;

                case 'obtenerEmpleado' :
                    $respuestaEmpCtrl = $empleadoControlador->obtenerUnEmpleado($parametrosPost);
                    $rutas->peticion($empleadoControlador->getCodigoRespuesta(),$respuestaEmpCtrl);

                    break;

                default:
                    $respuesta_back['status'] = false;
                    $respuesta_back['msg'] = array(
                        'No se encontro la funcion del contacto solicitado'
                    );
                    $rutas->peticion(404,$respuesta_back);
                    break;
            }
            break;
        case 'usuario':
            $usuarioControlador = new UsuarioControlador();

            switch ($parametrosGet['funcion']){

                case 'adminSesion' :
                    $respuestaUsrCtrl = $usuarioControlador->validarAdmin($parametrosPost);
                    $rutas->peticion($usuarioControlador->getCodigoRespuesta(),$respuestaUsrCtrl);

                    break;
                case 'obtenerPermisos':
                    $respuestaUsrCtrl = $usuarioControlador->obtenerPermisos();
                    $rutas->peticion($usuarioControlador->getCodigoRespuesta(),$respuestaUsrCtrl);
                    break;

                default:
                    $respuesta_back['status'] = false;
                    $respuesta_back['msg'] = array(
                        'No se encontro la funcion del usuario solicitado'
                    );
                    $rutas->peticion(404,$respuesta_back);
                    break;
            }
          break;
        default:
            $respuesta_back['status'] = false;
            $respuesta_back['msg'] = array(
                'No se encontro la peticion o la funcion solicitada en el GET'
            );
            $rutas->peticion(404,$respuesta_back);
            break;
    }

}else{
    $rutas->peticion(400,$respuesta_back);
}

class Rutas{

    public function peticion($codigoRespuesta, $respuesta){
        // var_dump($respuesta);
        http_response_code($codigoRespuesta);
        echo json_encode($respuesta);
    }

}