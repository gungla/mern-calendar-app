const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./databse/config');

// Creo el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Rutas para que funcione en el servidor
app.get('*', (req, resp) => {
    resp.sendFile(__dirname + '/public/index.html');
})

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo enpuerto ${ process.env.PORT }`);
});