<?php
include_once "modelo/UsuarioModelo.php";

class UsuarioControlador
{

    private $codigoRespuesta;
    private $usuarioModelo;

    function __construct()
    {
        $this->codigoRespuesta = 400;
        $this->usuarioModelo = new UsuarioModelo();

    }






    public function validarAdmin($parametrosForm){
        try{
            $campo = key($parametrosForm); // Obtiene el nombre del campo
            $valor = $parametrosForm[$campo];// valor
                if($valor == 'root'){
                    $respuesta['status'] = true;
                    $respuesta['msg'] = array('Admin correcto');
                    $this->codigoRespuesta = 201;
                }else{
                    $respuesta['status'] = false;
                    $respuesta['msg'] = array('Credencial incorrecta','vuelve a intentarlo');
                    $this->codigoRespuesta = 400;
                }



        }catch (Exception $ex){
            $respuesta['status'] = false;
            $respuesta['msg'] = array('Ocurrio un error en el servidor, favor de intentar mas tarde');
            $respuesta['msg'][] = $ex->getMessage();
            $this->codigoRespuesta = 500;
        }
        return $respuesta;
    }
    public function obtenerPermisos(){
        try{
            $respuesta['status'] = true;
            $respuesta['msg'] = array(
                'se obtuvo el listado de permisos correctamente'
            );
            $respuesta['data']['empleado'] = $this->usuarioModelo->obtenerListadoPermisos();
            $this->codigoRespuesta = 200;
        }catch (Exception $ex){
            $respuesta['status'] = false;
            $respuesta['msg'] = array('Ocurrio un error en el servidor, favor de intentar mas tarde');
            $respuesta['msg'][] = $ex->getMessage();
            $this->codigoRespuesta = 500;
        }
        return $respuesta;
    }


    public function getCodigoRespuesta(){
        return $this->codigoRespuesta;
    }

}