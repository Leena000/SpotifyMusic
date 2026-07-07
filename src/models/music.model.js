// Imports Mongoose to create the music schema and model.
const mongoose = require('mongoose');

// Defines how music data is stored in MongoDB.
const musicSchema = new mongoose.Schema({
    // Stores the uploaded music file URL from cloud storage.
    uri:{
        type: String,
        required: true
    },

    // Stores the music title.
    title: {
        type: String,
        required: true
    },

    // Stores the artist id who uploaded the music.
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

// Creates the Music model from the schema.
const musicModel = mongoose.model('Music', musicSchema);

// Exports the model for controllers.
module.exports = musicModel;
