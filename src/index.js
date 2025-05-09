//  importamos app.js para ejecutar el servidor de express
import app from "./app.js"
import dotenv from 'dotenv';
import { cleanIdleConnections } from "./databases/connection.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
  console.log('Modo multitenancy activado');
});

// Manejo de cierre limpio
process.on('SIGINT', async () => {
  console.log('Cerrando conexiones...');
  cleanIdleConnections();
  process.exit();
});