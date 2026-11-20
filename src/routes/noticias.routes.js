// src/routes/noticias.routes.js
import { Router } from 'express';
import * as controller from '../controllers/noticias.controller.js';

const router = Router();
router.get('/', login, controller.listar);
router.post('/', controller.criar);

export default router;