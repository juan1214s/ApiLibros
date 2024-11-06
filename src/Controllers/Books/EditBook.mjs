import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const EditBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publication_year, status, user_id } = req.body;
  let connection;

  if (!title || !author || !publication_year || !status) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    connection = await connectToDatabase();

    const [existingBook] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);

    if (existingBook.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }
    
    const [result] = await connection.query(
      'UPDATE books SET title = ?, author = ?, publication_year = ?, status = ?, user_id = ? WHERE id = ?',
      [title, author, publication_year, status, user_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    res.status(200).json({ message: "Libro actualizado exitosamente." });

  } catch (error) {
    console.error("Error al editar el libro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
