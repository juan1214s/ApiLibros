import { connectToDatabase } from "../../Db/DbConnection.mjs";
import { hashPassword } from "../../Bcrypt/BcryptModule.mjs";  

export const CreateUser = async (req, res) => {
  const { username, email, password } = req.body;
  let connection;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    connection = await connectToDatabase();

    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "El usuario o el email ya están en uso." });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario creado exitosamente."});

  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } finally {
    if (connection) {
      await connection.end(); 
    }
  }
};
