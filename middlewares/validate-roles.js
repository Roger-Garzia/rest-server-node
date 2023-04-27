const { response } = require('express');


const isAdminRole = (req, res= response, next) => {

    if(!req.usuario) {
        res.status(500).json({
            msg: 'se verifica el role sin validar de primera instancia el JWT'
        });
    }

    const { role, nombre} = req.usuario;

    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Debido a que ${nombre} No es un administrador, no tiene permisos de escritura`
        });
    }

    next();
}




module.exports = {
    isAdminRole
}