const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValid = async (role = '') => {
    existeRol = await Role.findOne({ role });

    if(!existeRol) {
        throw new Error(`El role ${ role } no existe en la DB`);
    }
}

const existeEmail = async (email = '') => {
    emailContent = await Usuario.findOne(email);
    if (emailContent) {
        throw new Error(`El email ${ email } ya se encuentra registrado`);
    };
}

const userExistById = async (id = '') => {
    user = await Usuario.findById(id);
    if (!user) {
        throw new Error(`El id ${ id } no esta registrado en el sistema`);
    };
}



module.exports = {
    esRolValid,
    existeEmail,
    userExistById
}