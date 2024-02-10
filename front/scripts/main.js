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
        console.log('esto mandamos:', nuevoEmpleado);
        try {
            // función para guardar el nuevo empleado
            const response = await EmpleadosService.guardarNuevoEmpleado(nuevoEmpleado);
            console.log('Empleado guardado exitosamente:', response);


        } catch (error) {
            console.error('Error al guardar el empleado:', error);
        }
    });
});

function obtenerEmpleados(datos) {
   // console.log('esto trae datos:', datos);
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
            <!-- Agrega más celdas según los datos que esperas recibir -->
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
    activarForm = false;
    // lo que se desactiva
    document.getElementById('regresarBtn').style.display = 'none';
    document.getElementById('formularioEmpleado').style.display = 'none';

    // lo que se activa
    document.getElementById('tablaEmpleados').style.display = 'inline';
    document.getElementById('agregarBtn').style.display = 'inline';

}
