import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/auth.controllers.js';

const router = Router();

// Rutas
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

export default router;