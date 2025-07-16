import Libro from '../api/models/libro.model.js';

export async function seedDatabase() {

    const cantidadLibros = await Libro.countDocuments();
    if (cantidadLibros > 0) {
        console.log("Database already seeded with books.");
        return;
    }

    await Libro.insertMany([
        {
            titulo: 'El Principito',
            autor: 'Antoine de Saint-Exupéry',
            stock: 10,
            editorial: 'Emecé',
            precio: 4500,
            isbn: '9789500418328',
            generos: ['Ficción', 'Clásico', 'Infantil']
        },
        {
            titulo: 'Cien Años de Soledad',
            autor: 'Gabriel García Márquez',
            stock: 5,
            editorial: 'Sudamericana',
            precio: 7500,
            isbn: '9789500724955',
            generos: ['Realismo mágico', 'Novela']            
        },
        {
            titulo: 'Sapiens',
            autor: 'Yuval Noah Harari',
            stock: 8,
            editorial: 'Debate',
            precio: 9800,
            isbn: '9788499924213',
            generos: ['Historia', 'Divulgación', 'Ensayo']
        }
    ]);
    console.log("Database seeded successfully");
};