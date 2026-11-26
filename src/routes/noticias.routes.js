// src/routes/noticias.routes.js
import { Router } from 'express';
import * as controller from '../controllers/noticias.controller.js';
import * as usuarioInfo from '../middleware/MiddlewareLogin.js'

const router = Router();
router.get('/listar', controller.listar);
router.post('/criar', controller.criar);
router.get('/buscar/:id', controller.buscarNoticia)
router.post('/editar/:id', controller.editar)
router.post('/comentario/postar/:id', controller.postarComentario)
router.delete('/deletar/:id', usuarioInfo.moderadorCheck, controller.deletar)
// router.delete('comentario/deletar', controller.deletaComentario)

export default router;