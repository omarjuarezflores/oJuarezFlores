// empleadoService.js

const API_URL = 'http://localhost/oJuarezFlores/back/rutas.php';

class EmpleadosService {
    static async obtenerListadoEmpleados() {
        const url = `${API_URL}?peticion=empleado&funcion=listado`;

        console.log('esto es la api:', url);


        try {

            const response = await fetch(url);
            console.log('esto es el response:', response);

            if (!response.ok) {
                const errorMessage = await response.text(); // Obtener el texto del cuerpo de la respuesta
                throw new Error(`Error al obtener datos. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();
            console.log('esto es el data:', data);

            return data;
        } catch (error) {
            //console.error('Error al obtener datos:', error);
            throw error;
        }
    }

    static async guardarNuevoEmpleado(nuevoEmpleado) {
        try {
            const url = `${API_URL}?peticion=empleado&funcion=nuevo`;
            console.log('esto api nuevo', url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEmpleado),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al guardar nuevo empleado. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}


export default EmpleadosService;
