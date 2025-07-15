import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro, eliminarLibro } from '../controllers/libros.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


const router = Router();

router.get('/', obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', obtenerLibroPorId); // Define la ruta para obtener un libro por ID
router.post('/', authMiddleware, crearLibro); // Define la ruta para crear un nuevo libro
router.put('/:id', authMiddleware, actualizarLibro); // Define la ruta para actualizar un libro por ID y ISBN
router.delete('/:id', authMiddleware, eliminarLibro); // Define la ruta para eliminar un libro por ID

// Solo usuarios registrados y logeados pueden postear, actualizar o eliminar libros

export default router;