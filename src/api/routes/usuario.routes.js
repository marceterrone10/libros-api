import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/perfil', authMiddleware, (req, res) => {

    const { id, email } = req.user; // importante para obtener el ID y email del usuario autenticado, user viene de authMiddleware cuando decodeamos

    res.json({
        message: 'Perfil de usuario obtenido correctamente',
        usuario: {
            id,
            email
        }
    });
});

export default router;