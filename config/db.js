// mongo database connection by using mongoose

const mongoose = require('mongoose'); // use mongoose 
const config = require('config'); // use config modules
const db = config.get('mongoURI'); // use config to get the parameters

// async function to wait the database connection completed
const connectDB =  async () => {
    try {
        console.log('trying to connect to the MongoDB...');

        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');

    } catch (err) {
        console.error(err.message);

        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;