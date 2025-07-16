import Libro from '../models/libro.model.js';
import { registrarVenta } from './venta.controllers.js';


export async function obtenerLibros(req, res){
    try {
        const libros = await Libro.find(); // consulta mongoDB para obtener todos los libros
        res.json(libros); // devuelve los libros en formato JSON

    } catch (error) {
        console.log("Error al obtener los libros:", error);
        res.status(500).json({
            error: "Error al obtener los libros"
        });
    }
};

export async function obtenerLibroPorId(req, res){
    const { id } = req.params;

    try {
        const libro = await Libro.findOne({ _id: id });
        if (!libro) {
            return res.status(404).json({
                error: `Libro con ID ${id} no encontrado`
            });
        };

        return res.json(libro); // devuelve el libro encontrado en formato JSON
    } catch (error) {
        console.log(`Error al obtener el libro con ID ${id}:`, error);
        res.status(500).json({
            error: `Error al obtener el libro con ID ${id}`
        });
    };
};

export async function crearLibro(req, res){
    const nuevoLibro = new Libro(req.body);

    try {
        const libroGuardado = await nuevoLibro.save(); // con .save() guardamos el libro en la base de datos
        console.log("Libro creado:", libroGuardado);
        res.status(201).json(libroGuardado); // devuelve el libro guardado en formato JSON

    } catch ( error ) {
        console.log("Error al crear el libro:", error);
        res.status(500).json({
            error: "Error al crear el libro",
            details: error
        });
    };
};

export async function actualizarLibro(req, res){
    const { id } = req.params;
    const actualizaciones = req.body;

    try {
        const libroActualizado = await Libro.findOneAndUpdate(
            { _id: id }, // buscamos el libro por ID y ISBN
            actualizaciones, // actualizamos con los datos del cuerpo de la solicitud
            { new: true, runValidators: true } // devuelve el libro actualizado y que cumpla con las validaciones del schema
        );
        if (!libroActualizado) {
            return res.status(404).json({
                error: `Libro con ID ${id} no encontrado`
            });
        }
        return res.json(libroActualizado); // devuelve el libro actualizado en formato JSON
    } catch ( error ) {
        console.log(`Error al actualizar el libro con ID ${id} e ISBN ${isbn}:`, error);
        res.status(500).json({
            error: `Error al actualizar el libro con ID ${id} e ISBN ${isbn}`,
            details: error
        });
    };
};

export async function eliminarLibro(req, res){
    const { id } = req.params;

    try {  
        const libroEliminado = await Libro.findOneAndDelete({_id: id}); // buscamos el libro por ID y eliminamos
        if (!libroEliminado) {
            return res.status(404).json({
                error: `Libro con ID ${id} no encontrado`
            });
        };

        return res.json({
            message: `Libro con ID ${id} eliminado correctamente`
        });

    } catch ( error ) {
        console.log(`Error al eliminar el libro con ID ${id}:`, error);
        res.status(500).json({
            error: `Error al eliminar el libro con ID ${id}`,
            details: error
        });
    };
};

export async function ajustarStock(req, res) {
    const { id } = req.params;
    const { cantidad, vendido } = req.body;

    try {
        const libro = await Libro.findById(id); // primero buscamos el libro por ID
        if(!libro) {
            return res.status(404).json({
                error: `Libro con ID ${id} no encontrado`
            });    
        }

        if ( vendido && libro.stock < cantidad ) { // si esta vendido y no hay suficiente stock ejecutamos el mensaje de error. vendido es un booleano
            return res.status(400).json({
                error: `No hay suficiente stock para vender ${cantidad} unidades del libro con ID ${id}`
            });
        } 

        libro.stock += cantidad // ajustamos el stock del libro
        await libro.save(); // guardamos los cambios en la base de datos

        if (vendido) {
            await registrarVenta({
                libroId: id,
                cantidad,
                usuarioId: req.user.id
            });
        };

        res.json({
            message: `Stock del libro con ID ${id} repuesto correctamente`,
            libro
        });


    } catch ( error ) {
        console.log(`Error al ajustar el stock del libro con ID ${id}:`, error);
        res.status(500).json({
            error: `Error al ajustar el stock del libro con ID ${id}`,
            details: error
        });
    }; 
};
