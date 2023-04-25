const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es información requerida']
    },
    email: {
        type: String,
        required: [true, 'El email es información requerida'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es información obligatoria']
    },
    img: { 
        type: String 
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: { 
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);