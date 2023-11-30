import { Router } from "express";
import { registrarUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuarioID, iniciarSesion, cerrarSesion } from "../controllers/usuario.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

//Registrar Usuario
router.post('/registrarUsuario', registrarUsuario);

//Obtener Usuario
router.get('/obtenerUsuario', authRequired, obtenerUsuario);

//Actualizar Usuario
router.put('/actualizarUsuario', authRequired, actualizarUsuario);

//Eliminar Usuario
router.delete('/eliminarUsuarioID/:id', authRequired, eliminarUsuarioID);

//Iniciar Sesión
router.post('/iniciarSesion', iniciarSesion);

//Cerrar Sesión
router.post('/cerrarSesion', cerrarSesion);

export default router;