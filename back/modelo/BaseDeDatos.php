<?php

include_once 'ConfigDB.php';

class BaseDeDatos
{

    private $mysqli;
    private $errores;

    function __construct()
    {
        try{
            $configDB = ConfigDB::getConfig();
            $this->mysqli = new mysqli(
                $configDB['hostname'],
                $configDB['usuario'],
                $configDB['password'],
                $configDB['bd'],
                $configDB['puerto']
            );
            if($this->mysqli->connect_errno){
                $this->errores = $this->mysqli->error_list;
                echo 'hubo un error en la conexion a la BD';die;
            }else{
                $this->errores = array();
            }
        }catch (Exception $ex){
            $this->errores[] = $ex->getMessage();
            echo 'Hubo un error en el servidor';die;
        }
    }

    public function obtenerCatContacto(){
        try{
            $query = $this->mysqli->query("select * from cat_contacto");
            $cat_contacto = array();
            while($registro = $query->fetch_assoc()){
                $cat_contacto[] = $registro;
            }
            return $cat_contacto;
        }catch (Exception $ex){
            return array();
        }
    }

    public function obtenerRegistros($tabla){
        try{
            $query = $this->mysqli->query("select * from $tabla");
            $registros_retorno = array();
            while($registro = $query->fetch_assoc()){
                $registros_retorno[] = $registro;
            }
            return $registros_retorno;
        }catch (Exception $ex){
            $this->errores[] = $ex->getMessage();
        }
    }

    public function insertarRegistro($tabla,$valores_insert){
        try{
            $string_llave_valor = $this->obtenerCadenaInsert($valores_insert);
            //var_dump($string_llave_valor);
            $sqlInsert = "insert into $tabla(".$string_llave_valor['columnas'].") values(".$string_llave_valor['values'].")";
            try{
                $query = $this->mysqli->query($sqlInsert);
                if($query !== true){
                    return false;
                }
                return true;
            }catch (Exception $ex){
                return false;
            }
            //culminar el insertado de este SQL a la BD
        }catch (Exception $ex){
            $this->errores[] = $ex->getMessage();
        }
    }
    public function eliminarRegistro($tabla, $id){
        try{
            // Obtener el nombre del campo y su valor desde el array $id
            $campo = key($id);        // Obtiene el nombre del campo
            $valor = $id[$campo];      // Obtiene el valor del campo

            // Construir la consulta de eliminación
            $sqlDelete = "DELETE FROM $tabla WHERE $campo = $valor";

            // Ejecutar la consulta
            try{
                $query = $this->mysqli->query($sqlDelete);
                if($query !== true){
                    return false;
                }
                return true;
            }catch (Exception $ex){
                return false;
            }


        } catch (Exception $ex) {
            $this->errores[] = $ex->getMessage();
        }
    }
    public function actualizarRegistro($tabla, $valores_update) {
        try {
            $idEmpleado = $valores_update['idempleados'];
            unset($valores_update['idempleados']);  // Remover el idempleados del array, ya que no se debe actualizar

            $string_llave_valor = $this->obtenerCadenaUpdate($valores_update);

            $sqlUpdate = "update $tabla set " . $string_llave_valor . " where idempleados = $idEmpleado";

            try {
                $query = $this->mysqli->query($sqlUpdate);

                if ($query !== true) {
                    return false;
                }

                return true;
            } catch (Exception $ex) {
                return false;
            }
        } catch (Exception $ex) {
            $this->errores[] = $ex->getMessage();
        }
    }



    private function obtenerCadenaInsert($valores_insert){
        $retorno = array(
            'columnas' => '',
            'values' => ''
        );
        $contador_index = 1;
        $tam_array_valores = sizeof($valores_insert);
        foreach ($valores_insert as $indice => $valor){
            if($contador_index < $tam_array_valores){
                $retorno['columnas'] .= $indice. ', ';
                $retorno['values'] .= "'$valor'". ', ';
            }else{
                $retorno['columnas'] .= $indice;
                $retorno['values'] .= "'$valor'";
            }
            $contador_index++;
        }
        return $retorno;
    }
    private function obtenerCadenaUpdate($valores_insert) {
        $retorno = '';

        $contador_index = 1;
        $tam_array_valores = sizeof($valores_insert);

        foreach ($valores_insert as $indice => $valor) {
            if ($contador_index < $tam_array_valores) {
                $retorno .= "$indice = '$valor', ";
            } else {
                $retorno .= "$indice = '$valor'";
            }
            $contador_index++;
        }

        return $retorno;
    }

    public function getErrores(){
        return $this->errores;
    }

}