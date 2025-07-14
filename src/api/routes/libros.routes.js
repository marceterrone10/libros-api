import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro } from '../controllers/libros.controllers.js';

const router = Router();

router.get('/', obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', obtenerLibroPorId); // Define la ruta para obtener un libro por ID
router.post('/', crearLibro); // Define la ruta para crear un nuevo libro
router.put('/:id', actualizarLibro); // Define la ruta para actualizar un libro por ID y ISBN
export default router; 