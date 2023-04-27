const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosRoutes = '/api/usuarios';
        this.authPath = '/api/auth';

        // Database Connection
        this.ConectarDB();
        
        // Middlewares
        this.middlewares();

        // Rutas de de la aplicacion
        this.routes();
    }

    async ConectarDB() {
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosRoutes, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.PORT, (req, res) => {
            console.log('Application run on Server', this.PORT);
        });
    }
}


module.exports = Server;