import { connectToDatabase } from "../../Db/DbConnection.mjs";

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  let connection;

  try {
    connection = await connectToDatabase();

    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente." });

  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end(); 
    }
  }
};
