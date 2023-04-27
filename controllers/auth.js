const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const generateJWT = require('../helpers/generate-jwt');


const initSession = async(req, res= response) => {

    const { email, password } = req.body;
    
    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Password no son correctos'
            });
        }
        
        // Verificar si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no se encuentra activo'
            });
        }
        
        // Verificar el password
        const validPassword = bcrypt.compare(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o Password no existe'
            });
        }

        // Generar el JWT
        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal contacte al Administrador'
        });
    }
}


module.exports = {
    initSession
}