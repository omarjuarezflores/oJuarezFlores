// empleadoService.js

const API_URL = 'http://localhost/oJuarezFlores/back/rutas.php';

class EmpleadosService {
    static async obtenerListadoEmpleados() {
        const url = `${API_URL}?peticion=empleado&funcion=listado`;



        try {

            const response = await fetch(url);

            if (!response.ok) {
                const errorMessage = await response.text(); // Obtener el texto del cuerpo de la respuesta
                throw new Error(`Error al obtener datos. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            //console.error('Error al obtener datos:', error);
            throw error;
        }
    }

    static async guardarNuevoEmpleado(nuevoEmpleado) {
        console.log('esto quiere guardar:', nuevoEmpleado);
        try {
            const url = `${API_URL}?peticion=empleado&funcion=nuevo`;
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
    static async editarEmpleado(nuevoEmpleado) {
        try {
            const url = `${API_URL}?peticion=empleado&funcion=actualizar`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEmpleado),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al editar el empleado. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async eliminarEmpleado(idEmpleado) {
        try {
            const url = `${API_URL}?peticion=empleado&funcion=eliminar`;
            const body = {
                "idempleados": idEmpleado
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al eliminar empleado. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerUnEmpleado(idEmpleado) {
        try {
            const url = `${API_URL}?peticion=empleado&funcion=obtenerEmpleado`;
            const body = {
                "idempleados": idEmpleado
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al obtener empleado. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

}


export default EmpleadosService;
