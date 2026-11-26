// src/routes/noticias.routes.js
import { Router } from 'express';
import * as controller from '../controllers/noticias.controller.js';
import * as login from '../controllers/login.controller.js'

const router = Router();
// router.get('/', login, controller.listar);
router.get('/listar', controller.listar);
router.post('/criar', controller.criar);
// router.get(':id', controller.ProcurarId)
// router.post('/comentario/postar/:id', controller.PostarComentario)
// router.delete('deletar/:id', controller.deletaNoticia)
// router.delete('comentario/deletar', controller.deletaComentario)

export default router;