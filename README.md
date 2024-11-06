# **API Libros**

**Este proyecto es una API para gestionar libros y usuarios, utilizando Node.js con Express y MySQL para la base de datos. Además, implementa autenticación mediante JWT y gestión de contraseñas con bcrypt.**

## **Requisitos**

**Antes de empezar, asegúrate de tener instalados los siguientes programas en tu máquina:**

- **[Node.js](https://nodejs.org/) (v16 o superior)**
- **[MySQL](https://www.mysql.com/) o cualquier otro sistema de gestión de bases de datos compatible**

## **Configuración del proyecto**

### **1. Clonar el repositorio**

**Primero, clona el repositorio en tu máquina local:**

**`git clone https://github.com/juan1214s/ApiLibros`**

**`cd ApiLibros`**

### **2. Instalar dependencias**

**El proyecto usa `npm` para la gestión de dependencias. Ejecuta el siguiente comando para instalar todas las dependencias necesarias:**

**`npm install`**

### **3. Configurar las variables de entorno**

**Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables de entorno:**


- **DB_HOST**: La dirección de tu servidor de base de datos MySQL (normalmente `localhost`).
- **DB_USER**: El nombre de usuario de MySQL.
- **DB_PASSWORD**: La contraseña de tu base de datos MySQL.
- **DB_NAME**: El nombre de la base de datos que utilizarás para este proyecto.
- **JWT_SECRET**: Un valor secreto que se utilizará para firmar los tokens JWT.
- **EMAIL_USER= El correo de la aplicacion
- **EMAIL_PASS= La contraseña q proporsiona google al dar los permisos

### **4. Crear la base de datos**

**Asegúrate de crear la base de datos en MySQL. Puedes hacerlo ejecutando el siguiente comando en tu consola MySQL:**

**`CREATE DATABASE nombre_de_tu_base_de_datos;`**

### **5. Configuración de la base de datos**

**El proyecto se conecta a la base de datos MySQL a través del archivo `DbConnection.mjs`. Asegúrate de que las configuraciones dentro de este archivo sean correctas según tu entorno de base de datos.**

### **6. Estructura del proyecto**

**La estructura de carpetas es la siguiente:**


### **7. Ejecutar el proyecto**

**Una vez que hayas configurado las variables de entorno y la base de datos, puedes iniciar el servidor de desarrollo ejecutando:**

**`npm start`**

**Esto ejecutará el proyecto en modo desarrollo. Si usas `nodemon`, el servidor se reiniciará automáticamente cuando detecte cambios en el código.**

**Por defecto, el servidor se ejecutará en `http://localhost:3000`.**

### **8. Acceder a la API**

**Una vez que el servidor esté en ejecución, podrás acceder a las siguientes rutas de la API:**

- **POST /Api/login**: Autenticación de usuarios. Se requiere el correo y la contraseña para obtener un token JWT.

### **9. Probar la API**

**Puedes usar herramientas como Postman o Insomnia para realizar pruebas de la API. Ejemplo de cómo hacer una petición de login:**

**URL: `http://localhost:3000/Api/login`**

**Método: POST**

**Body (JSON):**

{ "email": "usuario@dominio.com", "password": "tu_contraseña" }

**Si las credenciales son correctas, obtendrás un token de acceso en la respuesta.**

## **Consideraciones**

- **Asegúrate de que los puertos de la base de datos y el servidor de la API no estén siendo utilizados por otros servicios.**
- **Si tienes problemas con las conexiones o las rutas, revisa las configuraciones de tus variables de entorno y la estructura de las rutas en el proyecto.**

## **Licencia**

**Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.**

