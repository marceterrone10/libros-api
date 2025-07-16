import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro, eliminarLibro, ajustarStock } from '../controllers/libros.controllers.js';
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js';


const router = Router();

router.get('/', authMiddleware, obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', authMiddleware, obtenerLibroPorId); // Define la ruta para obtener un libro por ID

router.post('/', authMiddleware, checkRole, crearLibro); // Define la ruta para crear un nuevo libro
router.put('/:id', authMiddleware, checkRole, actualizarLibro); // Define la ruta para actualizar un libro por ID y ISBN
router.delete('/:id', authMiddleware, checkRole, eliminarLibro); // Define la ruta para eliminar un libro por ID
router.patch('/:id/stock', authMiddleware, checkRole, ajustarStock); // Define la ruta para ajustar el stock de un libro por ID



export default router;