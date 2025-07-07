import { pool } from './database.js';

class LibroController {

  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      res.status(500).json({ error: "Error al obtener los libros." });
    }
  }

  async add(req, res) {
    try {
      const libro = req.body;

      // Validación de campos esperados
      const camposEsperados = ["nombre", "autor", "categoria", "anioPublicacion", "ISBN"];
      const camposRecibidos = Object.keys(libro);

      const camposInvalidos = camposRecibidos.filter(c => !camposEsperados.includes(c));
      if (camposInvalidos.length > 0) {
        return res.status(400).json({ error: `Campos no válidos: ${camposInvalidos.join(", ")}` });
      }

      const [result] = await pool.query(
        `INSERT INTO Libros(nombre, autor, categoria, anioPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]
      );

      res.json({ "Id insertado": result.insertId });
    } catch (error) {
      console.error("Error al agregar libro:", error);
      res.status(500).json({ error: "Error al agregar libro." });
    }
  }

  async delete(req, res) {
    try {
      const { id_libro } = req.body;
      if (!id_libro) return res.status(400).json({ error: "Falta el campo 'id_libro'" });

      const [result] = await pool.query(
        `DELETE FROM Libros WHERE id_libro = ?`,
        [id_libro]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró un libro con ese ID." });
      }

      res.json({ "Registros eliminados": result.affectedRows });
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      res.status(500).json({ error: "Error al eliminar libro." });
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;
      const { id_libro } = libro;

      if (!id_libro) return res.status(400).json({ error: "Falta el campo 'id_libro'" });

      // Validar campos esperados (opcional)
      const camposEsperados = ["nombre", "autor", "categoria", "anioPublicacion", "ISBN", "id_libro"];
      const camposRecibidos = Object.keys(libro);

      const camposInvalidos = camposRecibidos.filter(c => !camposEsperados.includes(c));
      if (camposInvalidos.length > 0) {
        return res.status(400).json({ error: `Campos no válidos: ${camposInvalidos.join(", ")}` });
      }

      const [result] = await pool.query(
        `UPDATE Libros SET nombre = ?, autor = ?, categoria = ?, anioPublicacion = ?, ISBN = ? WHERE id_libro = ?`,
        [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN, id_libro]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró un libro con ese ID para actualizar." });
      }

      res.json({ "registros actualizados": result.changedRows });
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      res.status(500).json({ error: "Error al actualizar libro." });
    }
  }
}

export const libro = new LibroController();
