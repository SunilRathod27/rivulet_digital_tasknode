const mongoose = require('mongoose');

module.exports = {

        onConnectDB : async function () {
            try {
                const connectDb = await mongoose.connect(process.env.DB_URL);
                console.log("Database Connected Successfully ", connectDb.connection.host, connectDb.connection.name);
            } catch (error) {
                console.log("Error While Connect DB ", error);
            }
        }

}