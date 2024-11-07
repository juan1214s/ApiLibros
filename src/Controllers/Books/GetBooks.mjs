import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const GetBooks = async (req, res) => {
  let connection;

  try {
    connection = await connectToDatabase();

    const [book] = await connection.query('SELECT * FROM books');

    if (book.length === 0) {
      return res.status(404).json({ message: "No hay libros guardados." });
    }

    res.status(200).json(book[0]);

  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};