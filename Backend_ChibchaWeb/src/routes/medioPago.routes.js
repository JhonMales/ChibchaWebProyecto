import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { crearMedioPago, obtenerMediosPago, obtenerMedioPago, actualizarMedioPago } from "../controllers/medioPago.controller.js";

const router = Router();

//Endpoints
//Crear Medio de Pago
router.post('/crearMedioPago', authRequired, crearMedioPago);

//Obtener todos los Medios de Pago del Cliente
router.get('/obtenerMediosPago', authRequired, obtenerMediosPago);

//Obtener un Medio de Pago del Cliente
router.get('obtenerMedioPago/:id', authRequired, obtenerMedioPago);

//Actualizar Medio de Pago
router.put('/actualizarMedioPago/:id', authRequired, actualizarMedioPago);

export default router;