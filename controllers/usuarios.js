const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsers = async(req, res = response) => {
    const { desde = 0 ,limite = 5 } = req.query;
    const query = { estado: true };

    const [total, users] = await Promise.all[
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ];
    
    res.json({
        total,
        users
    });
};

const addUsers = async (req, res = response) => {
    const { nombre, apellido, email, password, role } = req.body;
    const usuario = new Usuario({ nombre, apellido, email, password, role });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar la informacion de usuario en DB
    await usuario.save();
    res.json({
        usuario
    });
};

const updateUsers = (req, res = response) => {
    const id = req.params.id;
    const {password, google, ...data } = req.body;

    //TODO: Validar contra la base de datos
    if(password) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }

    const usuario = Usuario.findByIdAndUpdate(id, data);

    res.json({
        msg: 'Actualizando datos en el metodo PUT',
        usuario
    });
};

const deleteUsers = async(req, res = response) => {
    const id = req.params.id;
    
    // Eliminar de manera fisica al Usuario
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Cambiando estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'Usuario eliminado de manera satisfactoria',
        usuario
    });
};


module.exports = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers
}