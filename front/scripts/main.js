// main.js

import EmpleadosService from "../services/empleadosService";
import EmpleadosModel from "../models/empleadosModel";
document.addEventListener('DOMContentLoaded', async function () {
    try {

        const datos = await EmpleadosService.obtenerListadoEmpleados();
        obtenerEmpleados(datos);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

let activarForm = false; // Variable de bandera

document.getElementById('agregarBtn').addEventListener('click', function() {
    activarFormulario();
});

document.getElementById('regresarBtn').addEventListener('click', function() {
    regresar();
});
document.addEventListener('DOMContentLoaded', function () {
    const formNuevoEmpleado = document.getElementById('formNuevoEmpleado');

    formNuevoEmpleado.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Obtener los valores de los campos del formulario
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
        nuevoEmpleado.nombre = nombre;
        nuevoEmpleado.aPaterno = apellidoPaterno;
        nuevoEmpleado.aMaterno = apellidoMaterno;
        nuevoEmpleado.edad = edad;
        nuevoEmpleado.fechaNacimiento = fechaNacimiento;
        nuevoEmpleado.genero = genero;
        nuevoEmpleado.sueldoBase = sueldoBase;
        nuevoEmpleado.claveEmpleado = claveempleado;
        try {
            // función para guardar el nuevo empleado
            const response = await EmpleadosService.guardarNuevoEmpleado(nuevoEmpleado);
            console.log('Empleado guardado exitosamente:', response);
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
            console.error('Error al guardar el empleado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el empleado',
                text: 'Hubo un problema al intentar guardar los datos.',
            });

            console.error('Error al guardar el empleado:', error);

        }
    });
});

function obtenerEmpleados(datos) {
    const tablaEmpleados = document.getElementById('tabla-empleados');

    tablaEmpleados.innerHTML = '';

    datos.data.empleado.forEach(empleado => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${empleado.idempleados}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.aPaterno}</td>
            <td>${empleado.aMaterno}</td>
            <td>${empleado.edad}</td>
            <td>${empleado.genero}</td>
            <td>${empleado.fechaNacimiento}</td>
            <td>$ ${empleado.sueldoBase}</td>
             <td>
               <button class="btn btn-primary btn-sm" onclick="editarEmpleado(${empleado})">
                       <i class="fa fa-edit"></i> Editar
                </button>

                 <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${empleado.idempleados})">
                    <i class="fa fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        tablaEmpleados.appendChild(fila);
    });



}

function activarFormulario() {
    activarForm = true;
    // lo que se desactiva
    document.getElementById('agregarBtn').style.display = 'none';
    document.getElementById('tablaEmpleados').style.display = 'none';

    // lo que se activa
    document.getElementById('formularioEmpleado').style.display = 'inline';
    document.getElementById('regresarBtn').style.display = 'inline';
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

window.editarEmpleado = async function(empleado) {
    try {
        // Parsea el objeto JSON si es necesario


        console.log('Esto se quiere editar:', empleado);

        // Llenar los campos del formulario con los datos del empleado
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('apellidoPaterno').value = empleado.aPaterno;
        document.getElementById('apellidoMaterno').value = empleado.aMaterno;
        document.getElementById('edad').value = empleado.edad;
        document.getElementById('fechaNacimiento').value = empleado.fechaNacimiento;
        document.getElementById('genero').value = empleado.genero;
        document.getElementById('sueldoBase').value = empleado.sueldoBase;
        document.getElementById('claveEmpleado').value = empleado.claveEmpleado;

        // Mostrar el formulario y ocultar la tabla
        activarFormulario();
    } catch (error) {
        console.error('Error al editar empleado:', error);
    }
}