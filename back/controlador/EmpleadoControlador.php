<?php

include_once "modelo/EmpleadoModelo.php";
include_once "helper/ValidacionFormulario.php";

class EmpleadoControlador
{

    private $codigoRespuesta;
    private $empleadoModelo;

    function __construct()
    {
        $this->codigoRespuesta = 400;
        $this->empleadoModelo = new EmpleadoModelo();
    }

    public function obtenerEmpleados(){
        try{
            $respuesta['status'] = true;
            $respuesta['msg'] = array(
                'se obtuvo el listado de empleados correctamente'
            );
            $respuesta['data']['empleado'] = $this->empleadoModelo->obtenerListado();
            $this->codigoRespuesta = 200;
        }catch (Exception $ex){
            $respuesta['status'] = false;
            $respuesta['msg'] = array('Ocurrio un error en el servidor, favor de intentar mas tarde');
            $respuesta['msg'][] = $ex->getMessage();
            $this->codigoRespuesta = 500;
        }
        return $respuesta;
    }

    public function insertarNuevo($parametrosForm){
        try{
            //validaciones de campos para poder guardar un empleado
            $validacion = ValidacionFormulario::empleadoNuevo($parametrosForm);
            if($validacion['status']) {
                $guardar = $this->empleadoModelo->insertar($parametrosForm);
                if($guardar){
                    $respuesta['status'] = true;
                    $respuesta['msg'] = array('Se guardo con exito el empleado');
                    $this->codigoRespuesta = 201;
                }else{
                    $respuesta['status'] = false;
                    $respuesta['msg'] = array('No fue posible guardar el empleados','Ocurrio un error en el sistema');
                    $this->codigoRespuesta = 500;
                }
            }else{
                $respuesta['status'] = false;
                $respuesta['msg'] = $validacion['msg'];
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

    public function actualizar($parametrosForm){
        try{
            $validacion = ValidacionFormulario::actualizarEmpleado($parametrosForm);
            if($validacion['status']) {
                //mandar a llamar el modelo de actualizar registro
            }else{
                $respuesta['status'] = false;
                $respuesta['msg'] = $validacion['msg'];
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

    public function getCodigoRespuesta(){
        return $this->codigoRespuesta;
    }

}