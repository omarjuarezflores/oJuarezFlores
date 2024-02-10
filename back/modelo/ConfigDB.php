<?php

class ConfigDB
{

    public static function getConfig(){
        switch ($_SERVER['SERVER_NAME']){
            default:
                $configDB = array(
                    'hostname' => 'localhost',
                    'usuario' => 'root',
                    'password' => '',
                    'bd' => 'examenphpsoftura2024',
                    'puerto' => '3306'
                );
                break;
        }
        return $configDB;
    }

}