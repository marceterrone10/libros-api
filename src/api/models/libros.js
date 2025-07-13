import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    isbn: { type: String, unique: true, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    stock: { type: Number, default: 0 },
    editorial: { type: String, required: true },
    generos: [String],
    precio: { type: Number, required: true }
});

export default mongoose.model("Libro", libroSchema, "libros"); //exportamos el modelo Libro y le decimos que use la colección "libros"