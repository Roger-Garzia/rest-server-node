const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, addUsers, updateUsers, deleteUsers } = require('../controllers/usuarios');
const fieldsValidate = require('../middlewares/validate-fields');
const { esRolValid, existeEmail, userExistById } = require('../helpers/db-validators');
const router = Router();



router.get('/', getUsers);

router.post('/',[
    check('nombre', 'El nombre debe ser incluido de manera obligatoria').not().isEmpty(),
    check('apellido', 'El apellido debe ser incluido de manera obligatoria').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email debe ser incluido de manera obligatoria').isEmail(),
    // check('role', 'No es un role válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRolValid),
    check('email').custom(existeEmail),
    fieldsValidate
], addUsers);

router.put('/:id', [
    check('id', 'El id especificado no existe').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(esRolValid),
    fieldsValidate,
],updateUsers);

router.delete('/:id', [
check('id', 'El id especificado no existe').isMongoId(),
check('id').custom(userExistById),
fieldsValidate
],deleteUsers);



module.exports = router;