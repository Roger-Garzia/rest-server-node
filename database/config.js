const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {

        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            // useNotifyTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        
        console.log('Database Connected Succesfully');
        
    } catch (e) {
        console.log(e);
        throw new Error('Error en la Conexión de DB');
    }
}



module.exports = dbConnection;