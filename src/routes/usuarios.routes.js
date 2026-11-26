// src/routes/usuarios.routes.js
import { Router } from 'express';
import * as controller from '../controllers/usuarios.controller.js';
import * as usuarioInfo from '../middleware/MiddlewareLogin.js'
import * as login from '../controllers/login.controller.js'


const router = Router();
router.post('/login', login.loginAtual )
router.get('/listar', usuarioInfo.moderadorCheck, controller.listarUsuario);
router.post('/criar', controller.criarUsuario);

export default router;