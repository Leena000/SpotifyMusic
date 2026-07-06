const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const musicController = require('../controllers/music.controller');

const upload = multer({
    storage: multer.memoryStorage(),
})
const router = express.Router();

router.post("/upload",authMiddleware.authArtist, upload.single('music'), musicController.createMusic);
router.post("/albums", authMiddleware.authArtist, upload.array('musics', 10), musicController.createAlbum);
router.get("/",authMiddleware.authUser, musicController.getAllMusics);
router.get("/albums",authMiddleware.authUser, musicController.getAllAlbums);
router.get("/albums/:id",authMiddleware.authUser, musicController.getAlbumById);




module.exports = router;