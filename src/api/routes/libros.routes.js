import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLibro } from '../controllers/libros.controllers.js';

const router = Router();

router.get('/', obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', obtenerLibroPorId); // Define la ruta para obtener un libro por ID
router.post('/', crearLibro); // Define la ruta para crear un nuevo libro
export default router; 