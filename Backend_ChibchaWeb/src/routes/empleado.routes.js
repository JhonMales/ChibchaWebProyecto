import { Router } from "express";
import { crearEmpleado, obtenerEmpleados, obtenerEmpleado, obtenerEmpleadoID, actualizarEmpleado, actualizarEmpleadoID } from "../controllers/empleado.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//Endpoints
//Registrar Empleado
router.post('/crearEmpleado', crearEmpleado);

//Obtener todos los Empleados
router.get('/obtenerEmpleados', obtenerEmpleados);

//Obtener Empleado
router.get('/obtenerEmpleado', authRequired, obtenerEmpleado);

//Obtener Empleado por ID
router.get('/obtenerEmpleadoID/:id', authRequired, obtenerEmpleadoID);

//Actualizar Empleado
router.put('/actualizarEmpleado', authRequired, actualizarEmpleado);

//Acualizar Empleado por ID
router.put('/actualizarEmpleadoID/:id', authRequired, actualizarEmpleadoID);

export default router;