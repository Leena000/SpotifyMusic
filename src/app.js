// Loads environment variables before the application starts.
require('dotenv').config();

// Imports required packages and route files.
const express = require('express');
const cookieParser = require('cookie-parser');
const connectMongoDatabase = require('./db/db');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

// Connects the application to MongoDB.
connectMongoDatabase();

// Creates the Express application instance.
const app = express();

// Allows the API to read JSON request bodies.
app.use(express.json());

// Allows the API to read JWT tokens stored inside cookies.
app.use(cookieParser());

// Registers authentication routes such as register, login, and logout.
app.use('/api/auth', authRoutes);

// Registers music and album routes.
app.use('/api/music', musicRoutes);

// Exports the app so Server.js can start it.
module.exports = app;
