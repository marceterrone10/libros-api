import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro, eliminarLibro } from '../controllers/libros.controllers.js';
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js';


const router = Router();

router.get('/', authMiddleware, obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', authMiddleware, obtenerLibroPorId); // Define la ruta para obtener un libro por ID

// Rutas protegidas por autenticación y verificación del rol
router.post('/', authMiddleware, checkRole, crearLibro); // Define la ruta para crear un nuevo libro
router.put('/:id', authMiddleware, checkRole, actualizarLibro); // Define la ruta para actualizar un libro por ID y ISBN
router.delete('/:id', authMiddleware, checkRole, eliminarLibro); // Define la ruta para eliminar un libro por ID

// Solo usuarios registrados y logeados pueden postear, actualizar o eliminar libros

export default router;