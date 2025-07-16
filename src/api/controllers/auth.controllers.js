import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // para acceder a las variables de entorno, en nuestro caso el JWT_SECRET

export async function registrarUsuario(req, res) {
    const { email, password, rol } = req.body;

    try {
        // verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({
                error: "El usuario ya existe"
            });
        };

        // primero hasheamos la password
        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({
            email,
            password: hash,
            rol
        });

        await nuevoUsuario.save(); // guardamos el nuevo usuario en la base de datos
        res.status(201).json({
            message: "Usuario registrado exitosamente"
        });

    } catch ( error ) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({
            error: "Error al registrar el usuario",
            details: error.message
        });
    };
};

export async function loginUsuario(req, res) {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        };

        const ok = await bcrypt.compare(password, usuario.password);
        if (!ok) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            });
        }
        // generamos un token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // el token expira en 1 hora
        );

        res.json({
            message: "Login exitoso",
            token // devolvemos el token al usuario
        });

    } catch ( error ) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({
            error: "Error al iniciar sesión",
            details: error.message
        });
    };
};