const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const generateJWT = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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


const googleSignIn = async(req, res= response, next) {
    const { id_token } = req.body

    try {
        
        const  { nombre, img, email } = await googleVerify(id_token);
        const usuario = await Usuario.findOne({ email});

        if(!usuario) {
            const data = {
                nombre,
                email,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario no existe en DB
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT( usuario.id);
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Google Token no se pudo verificar'
        });
    }


    next();
}


module.exports = {
    initSession,
    googleSignIn
}