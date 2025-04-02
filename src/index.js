//  importamos app.js para ejecutar el servidor de express
import app from "./app.js"
import dotenv from 'dotenv';
dotenv.config();

app.listen(3000)
console.log('Servidor iniciado...')