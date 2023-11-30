import { Router } from "express";
import { crearDistribuidor, obtenerDistribuidores, obtenerDistribuidor, obtenerDistribuidorID, actualizarDistribuidor, actualizarDistribuidorID } from "../controllers/distribuidor.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//Endpoints
//Registrar Distribuidor
router.post('/crearDistribuidor', crearDistribuidor);

//Obtener todos los Distribuidores
router.get('/obtenerDistribuidores', obtenerDistribuidores);

//Obtener Distribuidor
router.get('/obtenerDistribuidor', authRequired, obtenerDistribuidor);

//Obtener Distribuidor por ID
router.get('/obtenerDistribudorID/:id', authRequired, obtenerDistribuidorID);

//Actualizar Distribuidor
router.put('/actualizarDistribuidor', authRequired, actualizarDistribuidor);

//Acualizar Distribuidor por ID
router.put('/actualizarDistribuidorID/:id', authRequired, actualizarDistribuidorID);

export default router;