import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // para acceder a las variables de entorno, en nuestro caso el JWT_SECRET

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // obtenemos el token del header Authorization, separamos con split porque viene todo junto, y accedemos al segundo elemento del array

    if (!token) {
        return res.status(401).json({
            error: "Token no proporcionado"
        });    
    };

    try {

        //Ahora decodeamos el token usando jwt.verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verificamos que el token sea valido con la clave secreta de nuestro .env
        req.user = decoded; // guardamos la información del usuario decodificado en req.user
        next(); // llamamos a next() para continuar con la siguiente función middleware o ruta

    } catch ( error ) {
        console.error("Error al verificar el token:", error);
        return res.status(500).json({
            error: "Error al verificar el token"
        });
    };
};

export function checkRole(req, res, next) {
    const { rol } = req.user; // obtenemos el rol del user

    if ( rol !== 'admin' ) {
        return res.status(403).json({
            error: "Acceso denegado, se requiere rol de administrador"
        });
    }
    next(); // si el rol es admin, continuamos con la siguiente función middleware o ruta
};
