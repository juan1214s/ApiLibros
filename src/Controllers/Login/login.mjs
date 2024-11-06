import { connectToDatabase } from "../../Db/DbConnection.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginApi = async (req, res) => {
    let connection;
    try {
        connection = await connectToDatabase();

        const { email, password } = req.body;

        const [userExists] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (userExists.length === 0) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const user = userExists[0];
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(404).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const payload = {
            sub: user.id,
            usuario: user.email,
            nombre: user.username
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        res.json({ message: 'Acceso concedido', accessToken, idUsuario: user.id });
    } catch (error) {
        console.error(`Error interno al generar el token del login: ${error}`);
        res.status(500).json({ error: 'Error interno al generar el token del login.' });
    } finally {
        if (connection) {
            await connection.end(); 
        }
    }
};
