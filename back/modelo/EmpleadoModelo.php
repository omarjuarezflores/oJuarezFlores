<?php

include_once "ModeloBase.php";

class EmpleadoModelo extends ModeloBase
{

    function __construct()
    {
        parent::__construct('empleados');
    }

//    public function obtenerListado(){
//        $db = new BaseDeDatos();
//        return $db->obtenerRegistros('empleado');
//    }

}