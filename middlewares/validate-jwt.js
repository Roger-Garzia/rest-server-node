const jwt = require('jsonwebtoken');
const { response } = require('express');

const Usuario = require('../models/usuario');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: 'Acceso denegado, usuario no autorizado'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.GOLD_KEY);
        
        //Leer usuario que corresponda con el ID 
        const usuario = Usuario.findById(uid);

        // Verificar que el usuario este activo o que exista
        if(!usuario.estado || !usuario) {
            res.status(401).json({
                msg: 'No existe Usuario'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token Invalido'
        });
    }
};



module.exports = {
    validateJWT
};