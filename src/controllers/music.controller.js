// Imports the music model for creating and reading music documents.
const musicModel = require('../models/music.model');

// Imports the storage upload helper for uploading music files.
const { uploadMusicFileToStorage } = require('../services/storage.service');

// JWT is imported for future authentication-related use in this controller.
const jwt = require('jsonwebtoken');

// Imports the album model for creating and reading albums.
const albumModel = require('../models/album.model');

// Handles music file upload and creates a music document.
async function handleMusicUpload(req, res){
    // Gets the music title from form-data/body.
    const {title} = req.body;

   // Gets the uploaded file from Multer.
   const file = req.file;

   // Uploads the file buffer to ImageKit as a base64 string.
   const result = await uploadMusicFileToStorage(file.buffer.toString('base64'));

   // Creates a new music document in MongoDB.
   const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
   })

   // Sends the created music details back to the client.
   res.status(201).json({
    message: 'Music Created Successfully',
    music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: req.user.id
    }   
   })
}

// Handles album creation.
async function handleAlbumCreation(req, res){
         // Gets album title and selected music ids from the request body.
         const {title, musics} = req.body;

         // Creates the album document and links it with the logged-in artist.
         const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics    
         })  

         // Sends the created album details back to the client.
         res.status(201).json({
            message: 'Album Created Successfully',
            album: {
                id: album._id,
                title: album.title,
                artist: req.user.id,
                musics: album.musics
            }
        })
}

// Fetches all music records for authenticated users/artists.
async function fetchAllMusics(req, res){
    // Finds music records, limits the result, and shows artist username/email using populate.
    const musics = await musicModel.find()
    .limit(2)
    .populate('artist', 'username email');

    // Sends the music list response.
    res.status(200).json({
        message: "Musics fetched sucessfully",
        musics: musics
    })
}

// Fetches all albums for authenticated users/artists.
async function fetchAllAlbums(req, res){
    // Finds albums and shows selected artist details.
    const albums = await albumModel.find().populate('artist', 'username email').select("title artist")
    .populate("artist", "username email");

    // Sends the album list response.
    res.status(200).json({
        message: "Albums fetched sucessfully",
        albums: albums
    })
}

// Fetches one album using the album id from the URL parameter.
async function fetchAlbumById(req, res){
    // Reads the album id from req.params.id.
    const albumid = req.params.id;

    // Finds the album by id and includes artist username/email.
    const album = await albumModel.findById(albumid).populate('artist', 'username email');

    // Sends the album response. If the id does not exist, album will be null.
    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}

// Exports controller functions for music.routes.js.
module.exports = {handleMusicUpload, handleAlbumCreation, fetchAllMusics, fetchAllAlbums, fetchAlbumById};
