// Imports Mongoose to create the album schema and model.
const mongoose = require('mongoose');

// Defines how album data is stored in MongoDB.
const albumSchema = new mongoose.Schema({
    // Album title is required.
    title:{
        type: String,
        required: true
    },

    // Stores music ids that belong to this album.
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"music",
            }],

    // Stores the artist id who created this album.
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

// Creates the Album model from the schema.
const albumModel = mongoose.model('album', albumSchema);

// Exports the model for controllers.
module.exports = albumModel;
