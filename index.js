import express from 'express';
import { connection } from "./src/api/database/db.js";
import config from './src/api/config/environments.js';
import { seedDatabase } from './src/data/seed.js';
import librosRoutes from './src/api/routes/libros.routes.js';
import { morganMiddleware } from './src/api/middlewares/logger.js';
import authRoutes from './src/api/routes/auth.routes.js';
import usuarioRoutes from './src/api/routes/usuario.routes.js';

const app = express();
const PORT = config.port;

app.use(morganMiddleware); // Use morgan middleware for logging
app.use(express.json()); // Parse JSON request bodies
app.use('/api/libros', librosRoutes); // Use the libros routes
app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuarioRoutes);

// Database connection
async function startServer() {
    try {
        await connection(); // Connect to the MongoDB database
        console.log("Connected to MongoDB successfully");

        await seedDatabase(); // Seed the database with initial data
        console.log("Seeding database...");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

startServer();