<?php

class ValidacionFormulario
{

    public static function empleadoNuevo($datosFormulario){
        $validacion['status'] = true;
        $validacion['msg'] = array();
        if(!isset($datosFormulario['claveEmpleado']) || $datosFormulario['claveEmpleado'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo clave empleado es requerido';
        }
        if(!isset($datosFormulario['nombre']) || $datosFormulario['nombre'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo nombre es requerido';
        }if(!isset($datosFormulario['aPaterno']) || $datosFormulario['aPaterno'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo paterno es requerido';
        }if(!isset($datosFormulario['aMaterno']) || $datosFormulario['aMaterno'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo materno es requerido';
        }if(!isset($datosFormulario['fechaNacimiento']) || $datosFormulario['fechaNacimiento'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo fecha de nacimiento es requerido';
        }if(!isset($datosFormulario['genero']) || $datosFormulario['genero'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo genero es requerido';
        }if(!isset($datosFormulario['edad']) || $datosFormulario['edad'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo edad es requerido';
        }if(!isset($datosFormulario['sueldoBase']) || $datosFormulario['sueldoBase'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo sueldo es requerido';
        }
        return $validacion;
    }

    public static function actualizarEmpleado($datosFormulario){
        $validacion = self::empleadoNuevo($datosFormulario);
        if(!isset($datosFormulario['id']) || $datosFormulario['id'] == ''){
            $validacion['status'] = false;
            $validacion['msg'][] = 'El campo identificador es requerido';
        }
        return $validacion;
    }

}