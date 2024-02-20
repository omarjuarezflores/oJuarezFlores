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
            //validaciones de campos para poder editar un empleado
            $validacion = ValidacionFormulario::empleadoNuevo($parametrosForm);
            if($validacion['status'] && isset($parametrosForm['idempleados'])) {
                $guardar = $this->empleadoModelo->actualizar($parametrosForm);
                if($guardar){
                    $respuesta['status'] = true;
                    $respuesta['msg'] = array('Se modifico con exito el empleado');
                    $this->codigoRespuesta = 201;
                }else{
                    $respuesta['status'] = false;
                    $respuesta['msg'] = array('No fue posible modificar el empleado','Ocurrio un error en el sistema');
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

    public function eliminarEmpleado($parametrosForm){
        try{
            $campo = key($parametrosForm); // Obtiene el nombre del campo
            $valor = $parametrosForm[$campo];// valor
             if ($valor > 0 && $valor != null){
                 $eliminar = $this->empleadoModelo ->eliminar($parametrosForm);
                 if($eliminar){
                     $respuesta['status'] = true;
                     $respuesta['msg'] = array('Se elimino con exito el empleado');
                     $this->codigoRespuesta = 201;
                 }else{
                     $respuesta['status'] = false;
                     $respuesta['msg'] = array('No fue posible eliminar el empleado','Ocurrio un error en el sistema');
                     $this->codigoRespuesta = 500;
                 }
             }else{
                 $respuesta['status'] = false;
                 $respuesta['msg'] = 'Ingresa un Id valido';
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
    public function obtenerUnEmpleado($parametrosForm){
        try{
            $campo = key($parametrosForm); // Obtiene el nombre del campo
            $valor = $parametrosForm[$campo];// valor del id del empleado
            if ($valor > 0 && $valor != null){// pasa si el valor ees mayor a 0 y diferente de nulo
                  $respuesta['status'] = true;
                  $respuesta['msg'] = array('se obtuvo el empleado correctamente');
                  $respuesta['data']['empleado'] = $this->empleadoModelo->obtenerEmpleado($parametrosForm);
                  $this->codigoRespuesta = 200;

            }else{
                $respuesta['status'] = false;
                $respuesta['msg'] = 'Ingresa un Id valido';
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