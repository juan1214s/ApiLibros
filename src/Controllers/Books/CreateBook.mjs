import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const CreateBook = async (req, res) => {
  const { title, author, publication_year, status, user_id } = req.body;
  let connection;

  if (!title || !author || !publication_year || !status) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }
  console.log(user_id);

  try {
    connection = await connectToDatabase();

    const [existingBook] = await connection.query(
      'SELECT * FROM books WHERE title = ? AND author = ?',
      [title, author]
    );

    if (existingBook.length > 0) {
      return res.status(409).json({ message: "El libro ya existe." });
    }

    const [result] = await connection.query(
      'INSERT INTO books (title, author, publication_year, status, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, author, publication_year, status, user_id]
    );

    res.status(201).json({ message: "Libro creado exitosamente." });

  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
