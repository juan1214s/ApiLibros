import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const DeleteBook = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await connectToDatabase();

    const [existingBook] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);

    if (existingBook.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    const [result] = await connection.query('DELETE FROM books WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    res.status(200).json({ message: "Libro eliminado exitosamente." });

  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};