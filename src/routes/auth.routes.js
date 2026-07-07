// Imports Express and creates a router for authentication APIs.
const express = require('express');
const router = express.Router();

// Imports authentication controller functions.
const authController = require('../controllers/auth.controller');

// Registers a new user or artist.
router.post('/register', authController.handleUserRegistration);

// Logs in an existing user or artist.
router.post('/login', authController.handleUserLogin);

// Logs out the current user by clearing the token cookie.
router.post('/logout', authController.handleUserLogout);

// Exports the authentication router for app.js.
module.exports = router;
