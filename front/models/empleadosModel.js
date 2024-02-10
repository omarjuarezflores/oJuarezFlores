// empleadosModel.js

class EmpleadosModel {
    constructor(idempleados, claveEmpleado, nombre, aPaterno, aMaterno, edad, fechaNacimiento, genero, sueldoBase) {
        this.idempleados = idempleados;
        this.claveEmpleado = claveEmpleado;
        this.nombre = nombre;
        this.aPaterno = aPaterno;
        this.aMaterno = aMaterno;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.sueldoBase = sueldoBase;
    }
}

export default EmpleadosModel;
