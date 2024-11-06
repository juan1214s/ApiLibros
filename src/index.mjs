import app from "./app.mjs";
import { connectToDatabase } from "./Db/DbConnection.mjs";

// Puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 3000 || 5000 || 3400;

// Función para iniciar el servidor
async function startServer() {
  try {
    // Conectar a la base de datos
    await connectToDatabase();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

// Llamada para iniciar el servidor
startServer();
