import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { registrarDominio, obtenerDominiosAprobados, obtenerDominiosPendientes, actualizarDominio, eliminarDominio } from "../controllers/dominio.controller.js";

const router = Router();

//Endpoints
//Registrar Dominio
router.post('/registrarDominio', authRequired, registrarDominio);

//Obtener todos los Dominios Aprobados
router.get('/obtenerDominiosAprobados', authRequired, obtenerDominiosAprobados);

//Obtener todos los Dominios Pendientes
router.get('/obtenerDominiosPendientes', authRequired, obtenerDominiosPendientes);

//Actualizar Dominio
router.put('/actualizarDominio/:id', authRequired, actualizarDominio);

//Eliminar Dominio
router.delete('/eliminarDominio/:id', authRequired, eliminarDominio);

export default router;