import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    libro: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia para el libro vendido
        ref: 'Libro',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, // Referencia para el usuario que realizó la compra
        ref: 'Usuario',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cantidad: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Venta', ventaSchema);

