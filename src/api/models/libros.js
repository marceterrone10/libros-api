import mongoose from "mongoose";

const schema = new mongoose.Schema({
    isbn: { type: String, unique: true, required: true },
    titulo: String,
    autor: String,
    stock: Number,
    editorial: String,
    generos: [String]
});

export default mongoose.model("Libro", schema);