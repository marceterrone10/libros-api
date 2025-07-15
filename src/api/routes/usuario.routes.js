import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/perfil', authMiddleware, (req, res) => {
    res.json({
        usuario: req.usuario,
        message: 'Perfil de usuario obtenido correctamente'
    });
});

export default router;