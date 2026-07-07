// Imports Mongoose to create the user schema and model.
const mongoose = require('mongoose');

// Defines how user data is stored in MongoDB.
const userSchema = new mongoose.Schema({
    // Username is required and must be unique.
    username : {
        type: String,
        required: true,
        unique: true
    },

    // Email is required and must be unique.
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Password stores the hashed password, not the plain password.
    password:{
    type: String,
    required: true
    },

    // Role controls access. Artists can create music; users can view music.
    role:{
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
    }
    
})

// Creates the User model from the schema.
const userModel = mongoose.model('user', userSchema);

// Exports the model for controllers.
module.exports = userModel;
