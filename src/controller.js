import { pool } from './database.js';

class LibroController {
  
    async getAll(req, res) {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    }

  async add(req, res) {
    const libro = req.body;
    const [result] = await pool.query(
    `INSERT INTO Libros(nombre, autor, categoria, anioPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
    [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]
    );
      res.json({ "Id insertado": result.insertId });
    }

    async delete(req, res) {
    const libro = req.body;
      const [result] = await pool.query(`DELETE FROM Libros WHERE id_libro=(?)`, [libro.id_libro]);
      res.json({ "Registros eliminados": result.affectedRows });
     }

    async update(req, res) {
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), anioPublicacion=(?), ISBN=(?) WHERE id_libro=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN, libro.id_libro]);
        res.json({ "registros actualizados": result.changedRows });
     }

}

export const libro = new LibroController();
