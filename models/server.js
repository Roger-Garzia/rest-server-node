const express = require('express');
require('dotenv').config();
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosRoutes = '/api/usuarios';
        
        // Middlewares
        this.middlewares();

        // Rutas de de la aplicacion
        this.routes();
    }

    middlewares() {

        // Cors
        this.app.use(cors());

        // Lectura y parseo del body (estructura para poder leer formato JSON).
        this.app.use(express.json());

        // directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosRoutes, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.PORT, (req, res) => {
            console.log('Application run on Server', this.PORT);
        });
    }
}


module.exports = Server;