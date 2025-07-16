import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
});

export default mongoose.model("Usuario", usuarioSchema, "usuarios");
