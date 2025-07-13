import Libro from '../models/libros.js';

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
        const libroGuardado = await nuevoLibro.save(); // guardamos
        res.status(201).json(libroGuardado); // devuelve el libro guardado en formato JSON

    } catch ( error ) {
        console.log("Error al crear el libro:", error);
        res.status(500).json({
            error: "Error al crear el libro",
            details: error
        });
    };


}

