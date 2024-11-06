import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const EditUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  
  let connection;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    connection = await connectToDatabase();

    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const [result] = await connection.query(
      'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
      [username, email, password, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente." });

  } catch (error) {
    console.error("Error al editar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
