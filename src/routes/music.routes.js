// Imports Express for creating music routes.
const express = require('express');

// Imports authentication middleware for protected APIs.
const authMiddleware = require('../middlewares/auth.middleware');

// Imports Multer for handling file uploads from form-data.
const multer = require('multer');

// Imports music controller functions.
const musicController = require('../controllers/music.controller');

// Stores uploaded files in memory before sending them to cloud storage.
const upload = multer({
    storage: multer.memoryStorage(),
})

// Creates the router instance.
const router = express.Router();

// Uploads one music file. Only artists can use this route.
router.post("/upload",authMiddleware.authArtist, upload.single('music'), musicController.handleMusicUpload);

// Creates a new album. Only artists can use this route.
router.post("/albums", authMiddleware.authArtist, upload.array('musics', 10), musicController.handleAlbumCreation);

// Gets all music records. Users and artists can access this route.
router.get("/",authMiddleware.authUser, musicController.fetchAllMusics);

// Gets all albums. Users and artists can access this route.
router.get("/albums",authMiddleware.authUser, musicController.fetchAllAlbums);

// Gets one album by album id. Users and artists can access this route.
router.get("/albums/:id",authMiddleware.authUser, musicController.fetchAlbumById);

// Exports the music router for app.js.
module.exports = router;
