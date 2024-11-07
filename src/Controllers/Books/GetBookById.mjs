import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const GetBookById = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await connectToDatabase();

    const [book] = await connection.query('SELECT * FROM books WHERE id = ?', [id]);

    if (book.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }

    res.status(200).json(book[0]);

  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};