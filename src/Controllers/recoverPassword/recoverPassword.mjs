import { connectToDatabase } from "../../Db/DbConnection.mjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { hashPassword } from "../../Bcrypt/BcryptModule.mjs";

dotenv.config();

export const RecoverPassword = async (req, res) => {
  let connection;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'El correo y contraseña son requeridos.' });
    }

    connection = await connectToDatabase();

    const [user] = await connection.execute(
      'SELECT * FROM users WHERE email = ? ', 
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ error: 'No coincide el correo registrado.' });
    }

    const hashedPassword = await hashPassword(password);

    await connection.execute("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user[0].email, 
      subject: 'Cambio de contraseña en Juju',
      html: `
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 600px;
                    margin: auto;
                }
                .header {
                    background-color: #f4f4f4;
                    padding: 10px;
                    text-align: center;
                }
                .content {
                    margin: 20px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Juju</h1>
                </div>
                <div class="content">
                    <p>Hola,</p>
                    <p>Tu contraseña ha sido cambiada exitosamente.</p>
                    <p>Tu nueva contraseña es: <strong>${password}</strong></p>
                    <p>Si no has solicitado este cambio, por favor contacta a nuestro soporte inmediatamente.</p>
                    <p>Gracias por usar nuestros servicios.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Juju. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Contraseña actualizada exitosamente. Revisa tu correo electrónico.' });
  } catch (error) {
    console.error(`Error interno al intentar cambiar la contraseña del usuario: ${error.message}`);
    res.status(500).json({ error: 'Error interno al intentar cambiar la contraseña del usuario.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
