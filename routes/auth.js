const { Router } = require('express');
const { check } = require('express-validator');
const fieldsValidate = require('../middlewares/validate-fields');
const { initSession, googleSignIn } = require('../controllers/auth');

const router = Router();


router.post('/login', [
    check('email', 'El email debe ser obligatorio').isEmail(),
    check('password', 'El password introducido es obligatorio').not().isEmpty(),
    fieldsValidate
],initSession);

router.post('/google', [
    check('id_token', 'Es necesario contar con el ID Token de Google').not().isEmpty(),
    fieldsValidate
],googleSignIn);



module.exports = router;