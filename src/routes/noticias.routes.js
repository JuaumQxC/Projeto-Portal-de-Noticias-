// src/routes/noticias.routes.js
import { Router } from 'express';
import * as controller from '../controllers/noticias.controller.js';
import * as login from '../controllers/login.controller.js'

const router = Router();
router.get('/listar', controller.listar);
router.post('/criar', controller.criar);
router.get('/buscar/:id', controller.buscarNoticia)
// router.post('/comentario/postar/:id', controller.postarComentario)
// router.delete('deletar/:id', controller.deletaNoticia)
// router.delete('comentario/deletar', controller.deletaComentario)

export default router;