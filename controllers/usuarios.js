const { response } = require('express');


const getUsers = (req, res = response) => {
    res.send('Obteniendo users...');
};

const addUsers = (req, res = response) => {
    const data = req.body;
    res.send(data);
};

const updateUsers = (req, res = response) => {
    const id = req.params.id;
    res.json({
        id
    });
};

const deleteUsers = (req, res = response) => {
    res.send('Borrando users....');
};


module.exports = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers
}