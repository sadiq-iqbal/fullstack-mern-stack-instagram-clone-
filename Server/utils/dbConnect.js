const mongoose = require('mongoose');
require('dotenv').config();
// Middleware to handle JSON data, if needed

const connect = async (app) => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('Connection with DB established at host:', connection.connection.host);

        // Start the server after successful DB connection
        app.listen(process.env.PORT, () => {
            console.log('Connected to server at port', process.env.PORT);
        });
    }
    catch (error) {
        console.error('There was an error connecting to the database');
        console.error('Error:', error.message);
        process.exit(1);
    }
};

// Export the connect function
module.exports = connect;
