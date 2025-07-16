import Venta from '../models/venta.models.js';

export async function registrarVenta({ libroId, cantidad, usuarioId }) {
    const venta = new Venta({
        libro: libroId,
        cantidad: Math.abs(cantidad), // aseguramos que la cantidad sea positiva
        usuario: usuarioId,
    });

    return await venta.save(); // guardamos la venta en la base de datos
};
