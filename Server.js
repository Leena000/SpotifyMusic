 
 // Loads environment variables from the .env file.
const dotenv = require('dotenv').config;

// Imports the configured Express application from src/app.js.
const app = require('./src/app');

// Imports the database connection helper. The actual connection is started inside src/app.js.
const connectMongoDatabase = require('./src/db/db');

// Uses the PORT value from .env, or 3000 if PORT is not provided.
const PORT = process.env.PORT || 3000;

// Starts the Express server and listens for incoming API requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
