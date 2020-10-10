// mongo database connection by using mongoose

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // use config to get the parameters

// async function to wait the database connection completed
const connectDB =  async () => {
    try {
        console.log('trying to connect to the MongoDB...');

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);

        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;