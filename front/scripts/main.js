// main.js

import EmpleadosService from "../services/empleadosService";
import EmpleadosModel from "../models/empleadosModel";


let sesionAdministrador = false;
document.addEventListener('DOMContentLoaded', async function () {
    const sesionActiva = localStorage.getItem('sesionActiva');
    const sesionAdmin = localStorage.getItem('admin');
    if (sesionAdmin === 'root'){
        sesionAdministrador = true;
    }
    console.log('esto es sesion admin:', sesionAdmin);
    if (sesionActiva === false || sesionActiva === 'false') {
        console.log('esto no tiene sesion')
        // Redirigir a la página de login si no hay sesión activa
        document.getElementById('contenedorGlobal').style.display = 'none';

        Swal.fire({
            icon: 'error',
            title: 'Registrate!',
            text: 'Registra o inicia sesion',
        }).then((result) => {

            if (result.isConfirmed) {
                window.location.href = 'http://localhost/oJuarezFlores/front/vistas/login.html';


            }
        });
    }

    try {

        const datos = await EmpleadosService.obtenerListadoEmpleados();
        obtenerEmpleados(datos);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});


document.getElementById('agregarBtn').addEventListener('click', function() {
    activarFormulario(1);
});

document.getElementById('cerrarSesionBtn').addEventListener('click', function() {
        // Realiza la acción de cerrar sesión y redirige a la página de inicio de sesión
        localStorage.setItem('sesionActiva', false);
        window.location.href = 'http://localhost/oJuarezFlores/front/vistas/login.html';
});


document.getElementById('regresarBtn').addEventListener('click', function() {
    regresar();
});
document.addEventListener('DOMContentLoaded', function () {
    const formNuevoEmpleado = document.getElementById('formNuevoEmpleado');

    formNuevoEmpleado.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Obtener los valores de los campos del formulario
        const idEmpleado = document.getElementById('idEmpleado').value;
        const nombre = document.getElementById('nombre').value;
        const apellidoPaterno = document.getElementById('apellidoPaterno').value;
        const apellidoMaterno = document.getElementById('apellidoMaterno').value;
        const edad = document.getElementById('edad').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const genero = document.getElementById('genero').value;
        const sueldoBase = document.getElementById('sueldoBase').value;
        const claveempleado = document.getElementById('claveEmpleado').value;

        // Crear un objeto EmpleadoModel con los datos del formulario
        const nuevoEmpleado = new EmpleadosModel();
        nuevoEmpleado.idempleados = idEmpleado;
        nuevoEmpleado.nombre = nombre;
        nuevoEmpleado.aPaterno = apellidoPaterno;
        nuevoEmpleado.aMaterno = apellidoMaterno;
        nuevoEmpleado.edad = edad;
        nuevoEmpleado.fechaNacimiento = fechaNacimiento;
        nuevoEmpleado.genero = genero;
        nuevoEmpleado.sueldoBase = sueldoBase;
        nuevoEmpleado.claveEmpleado = claveempleado;
        console.log('esto intenta mandar', nuevoEmpleado)
        try {
            let response;
            // función para guardar el nuevo empleado
            if (nuevoEmpleado.idempleados == '' || nuevoEmpleado.idempleados == undefined){
                console.log('ESTO NUEVO');

                response = await EmpleadosService.guardarNuevoEmpleado(nuevoEmpleado);

            }else{
                console.log('ESTO EDITAR');

                response = await EmpleadosService.editarEmpleado(nuevoEmpleado);
                console.log('esto es el response:', response)


            }
            Swal.fire({
                icon: 'success',
                title: 'Guardado exitosamente',
                text: 'Los datos se guardaron correctamente.',
            }).then((result) => {
                // Si el usuario hace clic en OK, ejecutar la función regresar
                if (result.isConfirmed) {
                    obtenerEmpleadoReload();
                    regresar();

                }
            });


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el empleado',
                text: 'Hubo un problema al intentar guardar los datos.',
            });


        }
    });
});

function obtenerEmpleados(datos) {
    const tablaEmpleados = document.getElementById('tabla-empleados');

    tablaEmpleados.innerHTML = '';

    datos.data.empleado.forEach(empleado => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${empleado.nombre} ${empleado.aPaterno} ${empleado.aMaterno}</td>
            <td>${empleado.edad}</td>
            <td>${empleado.genero}</td>
            <td>${empleado.fechaNacimiento}</td>
            <td>$ ${empleado.sueldoBase}</td>
             <td>
             <button class="btn btn-success btn-sm" style="display: ${sesionAdministrador ? 'inline-block' : 'none'}" data-toggle="tooltip" data-placement="top" title="Permisos">
                  <i class="fa fa-key"></i>
                </button>
                  <button class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Ver más">
                    <i class="fa fa-eye"></i>
                </button>
               <button class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Editar"
                onclick="obtenerEmpleado(${empleado.idempleados})">
                    <i class="fa fa-edit"></i>
                </button>

                 <button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Eliminar"
                  onclick="eliminarEmpleado(${empleado.idempleados})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        tablaEmpleados.appendChild(fila);
    });



}

function activarFormulario(opcion) {
    // lo que se desactiva
switch (opcion){
    case 1:
        const formNuevoEmpleado = document.getElementById('formNuevoEmpleado');
        formNuevoEmpleado.reset();
        break;
    default:
        break;
}
    console.log('esto entra activar')
    document.getElementById('agregarBtn').style.display = 'none';
    document.getElementById('tablaEmpleados').style.display = 'none';

    // lo que se activa
    document.getElementById('formularioEmpleado').style.display = 'inline';
    document.getElementById('regresarBtn').style.display = 'inline';
}
function resetearForm(){

}

function regresar() {

    document.getElementById('regresarBtn').style.display = 'none';
    document.getElementById('formularioEmpleado').style.display = 'none';

    // lo que se activa
    document.getElementById('tablaEmpleados').style.display = 'inline';
    document.getElementById('agregarBtn').style.display = 'inline';



}
async function obtenerEmpleadoReload(){
    try {
        const nuevosDatos = await EmpleadosService.obtenerListadoEmpleados();

        obtenerEmpleados(nuevosDatos);

    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}
window.eliminarEmpleado = async function(idEmpleado) {
    try {
        const respuesta = await EmpleadosService.eliminarEmpleado(idEmpleado);
        console.log('esto response eliminar:', respuesta);
        if (respuesta && respuesta.status) {
            console.log('Empleado eliminado correctamente');
            Swal.fire({
                icon: 'success',
                title: 'Eliminado exitosamente',
                text: 'Los datos se eliminado correctamente.',
            }).then((result) => {
                if (result.isConfirmed) {
                    obtenerEmpleadoReload();

                }
            });
        } else {
            // Manejar el caso de error
            console.error('Error al eliminar empleado:', respuesta ? respuesta.msg : 'Respuesta inválida');
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el empleado',
                text: 'Hubo un problema al intentar eliminar los datos.',
            });
        }
    } catch (error) {
        // Manejar el error de la promesa rechazada
        console.error('Error al eliminar empleado:', error.message);
    }
}
window.obtenerEmpleado = async function(idEmpleado) {
    try {
        const respuesta = await EmpleadosService.obtenerUnEmpleado(idEmpleado);
        console.log('esto response obtener:', respuesta);
        if (respuesta && respuesta.status) {
            const empleado = respuesta.data.empleado[0];
            document.getElementById('idEmpleado').value = empleado.idempleados;
            document.getElementById('nombre').value = empleado.nombre;
            document.getElementById('apellidoPaterno').value = empleado.aPaterno;
            document.getElementById('apellidoMaterno').value = empleado.aMaterno;
            document.getElementById('edad').value = empleado.edad;
            document.getElementById('fechaNacimiento').value = empleado.fechaNacimiento;
            document.getElementById('genero').value = empleado.genero;
            document.getElementById('sueldoBase').value = empleado.sueldoBase;
            document.getElementById('claveEmpleado').value = empleado.claveEmpleado;
            activarFormulario();

        } else {
            // Manejar el caso de error
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener el empleado',
                text: 'Hubo un problema al intentar consultar los datos.',
            });
        }
    } catch (error) {
        // Manejar el error de la promesa rechazada
        console.error('Error al eliminar empleado:', error.message);
    }
}

window.editarEmpleado = async function(idempleados, nombre, aPaterno, aMaterno, edad, genero, fechaNacimiento, sueldoBase, claveEmpleado) {
    document.getElementById('idEmpleado').value = idempleados;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellidoPaterno').value = aPaterno;
    document.getElementById('apellidoMaterno').value = aMaterno;
    document.getElementById('edad').value = edad;
    document.getElementById('fechaNacimiento').value = fechaNacimiento;
    document.getElementById('genero').value = genero;
    document.getElementById('sueldoBase').value = sueldoBase;
    document.getElementById('claveEmpleado').value = claveEmpleado;
    activarFormulario();
    console.log("Editar empleado:", idempleados, nombre, aPaterno, aMaterno, edad, genero, fechaNacimiento, sueldoBase);
}
