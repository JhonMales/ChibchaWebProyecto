import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { crearTransaccion, generarTransaccion, obtenerTransacciones, obtenerTransaccion } from "../controllers/transaccion.controller.js";

const router = Router();

//Endpoints
//Crear Transacción
router.post('/crearTransaccion', authRequired, crearTransaccion);

//Generar Transacción
router.post('/generarTransaccion', authRequired, generarTransaccion);

//Obtener todos las Transacciones
router.get('/obtenerTransacciones', authRequired, obtenerTransacciones);

//Obtener una Trabsacción
router.get('obtenerTransaccion/:id', authRequired, obtenerTransaccion);

export default router;