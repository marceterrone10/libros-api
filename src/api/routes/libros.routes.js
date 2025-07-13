import { Router } from 'express';
import { obtenerLibros, obtenerLibroPorId } from '../controllers/libros.controllers.js';

const router = Router();

router.get('/', obtenerLibros); // Define la ruta para obtener todos los libros
router.get('/:id', obtenerLibroPorId); // Define la ruta para obtener un libro por ID

export default router; 