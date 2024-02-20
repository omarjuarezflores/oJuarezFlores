

const API_URL = 'http://localhost/oJuarezFlores/back/rutas.php';

class UsuariosService {


    static async consultarAdminSesion(pass) {
        try {
            const url = `${API_URL}?peticion=usuario&funcion=adminSesion`;
            const body = {
                "password": pass
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
                throw new Error(`Error al ingresar. Código de estado: ${response.status}, Mensaje: ${errorMessage}`);
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


export default UsuariosService;
