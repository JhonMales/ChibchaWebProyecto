import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { crearPagina, obtenerPaginas, obtenerPagina, actualizarPagina, eliminarPagina } from "../controllers/paginaWeb.controller.js";

const router = Router();

//Endpoints
//Crear Pagina Web
router.post('/crearPagina', authRequired, crearPagina);

//Obtener todos las Paginas del Cliente
router.get('/obtenerPaginas', obtenerPaginas);

//Obtener una Pagina Web del Cliente
router.get('obtenerPagina/:id', authRequired, obtenerPagina);

//Actualizar Pagina Web
router.put('/actualizarPagina/:id', authRequired, actualizarPagina);

//Eliminar Pagina Web
router.delete('/eliminarPagina/:id', authRequired, eliminarPagina);

export default router;
