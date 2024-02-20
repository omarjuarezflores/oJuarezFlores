import UsuariosService from "../services/usuariosService";
document.addEventListener('DOMContentLoaded', function () {
    const usuario = document.getElementById('formIngresar');

    usuario.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario


        try {
            //validar sesion
            let response;
            const usuario = document.getElementById('usuario').value;
            const contra = document.getElementById('contrasena').value;
            if (usuario === 'admin'){
                console.log('esto usuario', usuario);
                console.log('esto contra', contra);
                response = await UsuariosService.consultarAdminSesion(contra);
                if (response.status){
                    localStorage.setItem('admin', 'root');
                    localStorage.setItem('sesionActiva', true);

                    Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido',
                        text: 'Los datos se validaron correctamente.',
                    }).then((result) => {
                        // Si el usuario hace clic en OK, ejecutar la función regresar
                        if (result.isConfirmed) {
                            console.log('esto me response validar admin121331,', response);
                            window.location.href = 'http://localhost/oJuarezFlores/front/vistas/index.html';


                        }
                    });
                }


            }


        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            text: 'Usuario o contraseña incorrectos.',
        });


        }
    });
});