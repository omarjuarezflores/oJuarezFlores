$(document).ready(function(){

    $(document).on('click','#btn_agregar_contacto',function(){
        Empleado.mostrar_form_seccion();
    });

    $(document).on('click','#btn_cancelar_empleado_seccion',function(){
        Empleado.mostrar_resultados_seccion();
    });

    $(document).on('click','#btn_guardar_empleado_seccion',function(){
        Empleado.guardar_nuevo();
    });

    Empleado.listado();

});

var Empleado = {

    mostrar_form_seccion : function(){
        $('#seccion_filtro_tablero').hide();
        $('#seccion_formulario').show();
    },

    mostrar_resultados_seccion : function(){
        $('#seccion_filtro_tablero').show();
        $('#seccion_formulario').hide();
    },

    listado : function(){
        $('#tbodyResultadosEmpleado').html('<tr><td colspan="5" class="centrado"><span class="spinner-border"></span> Procesando datos</td></tr>');
        $.ajax({
            type : 'get',
            url : URL_BACKEND + 'peticion=empleado&funcion=listado',
            data : {},
            dataType : 'json',
            success : function(respuestaAjax){
                //console.log(respuestaAjax);
                if(respuestaAjax.status){
                    //procesar los datos obtenidos del backend en json y convertirlos a un formato de html
                    var html_listado_empleados = '';
                    respuestaAjax.data.empleado.forEach(function(empleado){
                        html_listado_empleados += '<tr>' +
                                '<td>'+empleado.id_empleado+'</td>' +
                                '<td>'+empleado.nombre+ ' '+empleado.paterno+ ' '+ empleado.materno +'</td>' +
                                '<td>'+empleado.nacimiento+'</td>' +
                                '<td></td>' +
                                '<td>' +
                                    '<button type="button" data-bs-toggle="modal" data-bs-target="#modal_registro_contacto"\n' +
                                    '   class="btn_modificar_contacto btn btn-sm btn-outline-warning">Editar</button>\n' +
                                    '<button type="button" class="btn_eliminar_contacto btn btn-sm btn-outline-danger">Eliminar</button>' +
                                '</td>' +
                            '</tr>';
                    });
                    $('#tbodyResultadosEmpleado').html(html_listado_empleados);
                }else{
                    var html_errores = '';
                    //iterar los mensajes de la respuesta del ajax/json y convertirlos a formato HTML
                    respuestaAjax.msg.forEach(function(elemento){
                        html_errores += '<li>'+elemento+'</li>'
                    });
                    $('#div_mensasjes_sistema').html(html_errores);
                    $('#seccion_mensajes_sistema').show();
                    //ocultar mensajes del sistema despues de 5 segundos
                    setTimeout(function(){
                        $('#seccion_mensajes_sistema').hide();
                        $('#div_mensasjes_sistema').html('');
                    },5000);
                }
            },error : function(error){
                console.log(error);
                alert('Hubo un error en el AJAX');
            }
        });
    },

    validar_formulario : function(){
        var validacion = {
            status : true,
            msg : ''
        };
        if($('#nombre_form').val() == ''){
            validacion.status = false;
            validacion.msg += '<li>El campo nombre es requerido</li>';
        }if($('#paterno_form').val() == ''){
            validacion.status = false;
            validacion.msg += '<li>El campo apellido paterno es requerido</li>';
        }
        return validacion;
    },

    guardar_nuevo : function(){
        var validacion = Empleado.validar_formulario();
        if(validacion.status){
            $.ajax({
                type : 'post',
                url : URL_BACKEND + 'peticion=empleado&funcion=nuevo',
                data : $('#form_registro_contacto').serialize(),
                /**
                 * data: {
                 *     nombre : $('#nombre_form').val(),
                 *     ...
                 *     ...
                 *
                 * }
                 */
                dataType: 'json',
                success : function(respuestaAjax){
                    if(respuestaAjax.status){
                        Empleado.mostrar_resultados_seccion();
                        Empleado.listado();
                    }else{
                        var html_errores = '';
                        //iterar los mensajes de la respuesta del ajax/json y convertirlos a formato HTML
                        respuestaAjax.msg.forEach(function(elemento){
                            html_errores += '<li>'+elemento+'</li>'
                        });
                        $('#div_mensasjes_sistema').html(html_errores);
                        $('#seccion_mensajes_sistema').show();
                        //ocultar mensajes del sistema despues de 5 segundos
                        setTimeout(function(){
                            $('#seccion_mensajes_sistema').hide();
                            $('#div_mensasjes_sistema').html('');
                        },5000);
                    }
                },error(error){
                    console.log(error);
                    alert('Hubo un error en el AJAX');
                }
            });
        }else{
            $('#div_mensasjes_sistema').html(validacion.msg);
            $('#seccion_mensajes_sistema').show();
            //ocultar mensajes del sistema despues de 5 segundos
            setTimeout(function(){
                $('#seccion_mensajes_sistema').hide();
                $('#div_mensasjes_sistema').html('');
            },5000);
        }
    }

}