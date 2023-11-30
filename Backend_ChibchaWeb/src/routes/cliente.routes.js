import { Router } from "express";
import { crearCliente, obtenerClientes, obtenerCliente, obtenerClienteID, actualizarCliente, actualizarClienteID } from "../controllers/cliente.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//Endpoints
//Registrar Cliente
router.post('/crearCliente', crearCliente);

//Obtener todos los Clientes
router.get('/obtenerClientes', obtenerClientes);

//Obtener Cliente
router.get('/obtenerCliente', authRequired, obtenerCliente);

//Obtener Cliente por ID
router.get('obtenerClienteID/:id', authRequired, obtenerClienteID);

//Actualizar Cliente
router.put('/actualizarCliente', authRequired, actualizarCliente);

//Acualizar Cliente por ID
router.put('/actualizarClienteID/:id', authRequired, actualizarClienteID);

export default router;
