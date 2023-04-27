const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = uid;
        jwt.sign(payload, process.env.GOLD_KEY, {
            expiresIn: "24h"
            // expiresIn: 60 * 60 * 24
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el Token');
            } else {
                resolve(token);
            }
        });
    });
}



module.exports = generateJWT;