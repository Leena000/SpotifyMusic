// Imports Mongoose to connect the Node.js application with MongoDB.
const mongoose = require('mongoose');

// Connects the application to MongoDB using the MONGO_URI value from .env.
async function connectMongoDatabase(){
    try{
        // Starts the MongoDB connection.
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        // Logs connection errors if MongoDB connection fails.
        console.error('Error connecting to MongoDB:', error);   
    }
}

// Exports the connection function for app.js.
module.exports = connectMongoDatabase;
