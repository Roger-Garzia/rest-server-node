const { Router } = require('express');
const { getUsers, addUsers, updateUsers, deleteUsers } = require('../controllers/usuarios');
const router = Router();


router.get('/', getUsers);

router.post('/', addUsers);

router.put('/:id', updateUsers);

router.delete('/:id', deleteUsers);



module.exports = router;