import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { crearTicket, obtenerTickets, obtenerTicket, actualizarTicket, eliminarTicket } from "../controllers/ticket.controller.js";

const router = Router();

//Endpoints
//Crear ticket
router.post('/crearTicket', authRequired, crearTicket);

//Obtener todos los tickets
router.get('/obtenerTickets', authRequired, obtenerTickets);

//Obtener un solo ticket
router.get('/obtenerTicket/:id', authRequired, obtenerTicket);

//Actualizar ticket
router.put('/actualizarTicket/:id', authRequired, actualizarTicket);

//Eliminar ticket
router.delete('/eliminarTicket/:id', authRequired, eliminarTicket);

export default router;
